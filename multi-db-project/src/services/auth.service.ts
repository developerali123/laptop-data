import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CacheService } from 'src/common/cache.service';
import { PrismaClient as TenantPrisma } from '../../prisma/generated/tenant';
import { LoginDto, RefreshTokenDto, SignupDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('TENANT_PRISMA') private readonly prisma: TenantPrisma,
    private readonly jwtService: JwtService,
    private readonly cache: CacheService,
  ) {}

  async signup(dto: SignupDto): Promise<{ message: string; otp: string }> {
    const userExists = await this.prisma.auth.findUnique({
      where: { email: dto.email },
    });

    if (userExists) throw new ConflictException('Email already registered');

    if (dto.role === 'admin') {
      const adminExists = await this.prisma.auth.findFirst({
        where: { role: 'admin' },
      });

      if (adminExists)
        throw new ConflictException('User with Admin Role already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.auth.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
      },
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.cache.set(`otp:${user.email}`, otp, 300); // 5 minutes TTL

    return { message: `Signup successful. Please verify OTP. ${otp}`, otp };
  }

  async verifyOtp(email: string, otp: string): Promise<{ message: string }> {
    const storedOtp = this.cache.get<string>(`otp:${email}`);

    if (!storedOtp) {
      throw new BadRequestException('OTP expired or not found');
    }
    if (storedOtp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    this.cache.del(`otp:${email}`);

    await this.prisma.auth.update({
      where: { email },
      data: { isVerified: true, isActive: true },
    });

    return {
      message: 'OTP verified successfully. Your account is now verified.',
    };
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.prisma.auth.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException('Invalid Email');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid Password');

    if (!user.isVerified) throw new BadRequestException('Email not verified');
    if (!user.isActive) throw new ForbiddenException('Account is not active');

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '12h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    this.cache.set(`refreshToken:${user.id}`, refreshToken, 7 * 24 * 3600);

    const { password: _, ...userData } = user;

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
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const stored = this.cache.get<string>(`refreshToken:${decoded.userId}`);
    if (!stored || stored !== refreshToken)
      throw new UnauthorizedException('Refresh token not recognized');

    const payload = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name,
    };

    const newAccessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '30m',
    });

    return { accessToken: newAccessToken };
  }

  logout(userId: string) {
    const deleted = this.cache.del(`refreshToken:${userId}`);
    if (!deleted) throw new NotFoundException('No active session found');
    return { message: 'User logged out successfully' };
  }
}
