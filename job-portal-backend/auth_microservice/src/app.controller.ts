import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import {
  AccountStatusDto,
  ChangePasswordDto,
  RefreshTokenDto,
  ResetPasswordDto,
  SignupDto,
  VerifyEmailDto,
  VerifyOtpDto,
} from './dto/auth.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';

@ApiTags('Auth')
@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) { }

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
    return this.appService.signup(dto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({ status: 200, description: 'OTP verified successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.appService.verifyOtp(dto.email, dto.otp);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset Pssword' })
  @ApiResponse({ status: 200, description: 'Password reset successful' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.appService.resetPassword(dto);
  }

  @Post('verify-email')
  @ApiOperation({ summary: 'Verify user email with OTP' })
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.appService.verifyEmail(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  async login(@Body() dto: ResetPasswordDto) {
    return this.appService.login(dto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Generate new access token using refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Access token generated successfully',
  })
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return this.appService.refreshAccessToken(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  logout(@Req() req: any) {
    const userId = req.user.userId;
    return this.appService.logout(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  @ApiOperation({ summary: 'Change Password' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 400, description: 'Old password incorrect' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    const userId = req.user.sub;
    return this.appService.changePassword(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({ status: 200, description: 'User info returned successfully' })
  async getProfile(@Req() req) {
    const userId = req.user.sub;
    return this.appService.getUserProfile(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('account-status')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Activate or deactivate your account' })
  @ApiResponse({
    status: 200,
    description: 'Account status updated successfully',
  })
  async updateAccountStatus(@Req() req, @Body() body: AccountStatusDto) {
    const userId = req.user.sub;
    return this.appService.updateAccountStatus(userId, body.isActive);
  }

  // @MessagePattern('auth.validate-token')
  // validateToken(@Payload() token: string) {
  //   return this.appService.validateToken(token);
  // }

  // @MessagePattern('auth.validate-company')
  // async handleCompanyValidation(@Payload() payload: { companyId: string }) {
  //   const { companyId } = payload;
  //   const company = await this.appService.findById(companyId);

  //   return {
  //     companyId: company?.id,
  //     name: company?.name,
  //     email: company?.email,
  //   };
  // }
}
