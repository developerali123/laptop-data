import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from 'src/dtos/user.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { UserService } from 'src/services/user.service';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly Service: UserService) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update User' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User Updated successfully' })
  @ApiResponse({ status: 400, description: 'Updation Error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async UpdateUser(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    if (req.user.role !== 'admin') {
      throw new BadRequestException('only admin can update user');
    }
    return this.Service.UpdateUser(id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  async getAll() {
    return this.Service.getAll();
  }
  @Get('me')
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({ status: 200, description: 'User info returned successfully' })
  async getProfile(@Req() req) {
    const userId = req.user.userId;
    return this.Service.getUserProfile(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async delete(@Param('id') id: string) {
    return this.Service.delete(id);
  }
}
