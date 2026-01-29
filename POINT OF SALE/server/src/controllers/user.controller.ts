import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dto';
import { UserService } from 'src/microservices/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    try {
      return await this.userService.createUser(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST); // Return a 400 Bad Request error
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of all users.' })
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({ status: 200, description: 'The user details.' })
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
