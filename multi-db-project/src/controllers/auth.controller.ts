import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { AuthService } from 'src/services/auth.service';
import {
  LoginDto,
  RefreshTokenDto,
  SignupDto,
  VerifyOtpDto,
} from '../dtos/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly Service: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 201,
    description: 'Record Created & OTP sent successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async signup(@Body() dto: SignupDto) {
    return this.Service.signup(dto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({ status: 200, description: 'OTP verified successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.Service.verifyOtp(dto.email, dto.otp);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  async login(@Body() dto: LoginDto) {
    return this.Service.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('refresh-token')
  @ApiOperation({ summary: 'Generate new access token using refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Access token generated successfully',
  })
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return this.Service.refreshAccessToken(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  logout(@Req() req: any) {
    const userId = req.user.userId;
    return this.Service.logout(userId);
  }
}
