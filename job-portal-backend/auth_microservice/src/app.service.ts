import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaService } from 'prisma/prisma.service';
import {
  ChangePasswordDto,
  RefreshTokenDto,
  ResetPasswordDto,
  SignupDto,
  VerifyEmailDto,
} from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { generateAndStoreOtp } from './utils/otp.util';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject('REDIS_CLIENT') private redisClient: Redis,
    @Inject('AUTH_SERVICE') private rabbitClient: ClientProxy,
  ) { }
  async signup(dto: SignupDto): Promise<{ message: string }> {
    const userExists = await this.prisma.auth.findUnique({
      where: { email: dto.email },
    });

    if (userExists) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.auth.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
      },
    });

    const otp = await generateAndStoreOtp(
      this.redisClient,
      `otp:${user.email}`,
    );

    // You can log or send the OTP via email

    return { message: `Signup successful. Please verify OTP.${otp}` };
  }

  async verifyOtp(email: string, otp: string): Promise<{ message: string }> {
    const storedOtp = await this.redisClient.get(`otp:${email}`);

    if (!storedOtp) {
      throw new BadRequestException('OTP expired or not found.');
    }

    if (storedOtp !== otp) {
      throw new BadRequestException('Invalid OTP.');
    }

    // Optionally, delete OTP after successful verification
    await this.redisClient.del(`otp:${email}`);

    await this.prisma.auth.update({
      where: { email },
      data: { isVerified: true, isActive: true },
    });

    return {
      message: 'OTP verified successfully. Your account is now verified.',
    };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const { email, password } = dto;
    const userExists = await this.prisma.auth.findUnique({
      where: { email },
    });

    if (userExists) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update user's password in the database
      await this.prisma.auth.update({
        where: { email },
        data: { password: hashedPassword },
      });

      return { message: 'Password reset successful' };
    } else {
      throw new BadRequestException('Email does not exist.');
    }
  }

  async verifyEmail(dto: VerifyEmailDto): Promise<{ message: string }> {
    const { email } = dto;

    const userExists = await this.prisma.auth.findUnique({
      where: { email },
    });
    if (userExists) {
      const otp = await generateAndStoreOtp(this.redisClient, `otp:${email}`);

      // You can log or send the OTP via email
      return { message: 'Email verified' };
    } else {
      throw new BadRequestException('Email does not exist.');
    }
  }

  async login(
    dto: ResetPasswordDto,
  ): Promise<{ user: any; accessToken: string; refreshToken: string }> {
    const { email, password } = dto;

    const user = await this.prisma.auth.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid Email');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid Password');
    }

    // Optionally check if email is verified
    if (!user.isVerified) {
      throw new BadRequestException('Email not verified');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Account is not Active');
    }

    // Generate tokens
    const payload = { userId: user.id, email: user.email, role: user.role, name: user.name };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '30m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // example 7 days expiry for refresh token
    });

    // Optionally, store refresh token in Redis or DB for session management
    await this.redisClient.set(
      `refreshToken:${user.id}`,
      refreshToken,
      'EX',
      7 * 24 * 3600,
    );

    // Return user info + tokens (exclude password)
    const { password: _password, ...userData } = user;

    this.rabbitClient.emit('auth.user-created', {
      user: userData,
      accessToken,
      refreshToken,
    });

    return {
      user: userData,
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(
    dto: RefreshTokenDto,
  ): Promise<{ accessToken: string }> {
    const { refreshToken } = dto;

    let decoded: any;
    try {
      decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const redisKey = `refreshToken:${decoded.userId}`;
    const storedToken = await this.redisClient.get(redisKey);

    if (!storedToken || storedToken !== refreshToken) {
      throw new UnauthorizedException('Refresh token not recognized');
    }

    const payload = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name
    };

    const newAccessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '30m',
    });

    return { accessToken: newAccessToken };
  }

  async logout(userId: string): Promise<{ message: string }> {
    const key = `refreshToken:${userId}`;
    const deleted = await this.redisClient.del(key);
    if (!deleted) {
      throw new NotFoundException('No active session found for this user');
    }
    return { message: 'User logged out successfully' };
  }

  async changePassword(
    userId: string,
    dto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const user = await this.prisma.auth.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) throw new BadRequestException('Old password is incorrect');

    const hashedNewPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.auth.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return { message: 'Password changed successfully' };
  }

  async getUserProfile(userId: string) {
    const user = await this.prisma.auth.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }

  async updateAccountStatus(
    userId: string,
    isActive: boolean,
  ): Promise<{ message: string }> {
    await this.prisma.auth.update({
      where: { id: userId },
      data: { isActive },
    });

    const status = isActive ? 'activated' : 'deactivated';
    return { message: `Account ${status} successfully` };
  }

  validateToken(token: string): any {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return { valid: true, user: decoded };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  findById(id: string) {
    try {
      return this.prisma.auth.findUnique({
        where: { id },
      });
    } catch (err) {
      throw new BadRequestException('No Record Exist');
    }
  }
}
