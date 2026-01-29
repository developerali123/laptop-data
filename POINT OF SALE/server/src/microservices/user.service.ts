import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Helper function to hash the password
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10); // Default salt rounds is 10
  }

  // Helper function to check user existence by ID
  private async checkUserExists(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // Helper function to check if username exists
  private async checkUsernameExists(username: string, excludeUserId?: number): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { UserName: username } });
    return user && user.id !== excludeUserId; // Don't check against current user if excludeUserId is provided
  }

  // Create user with hashed password
  async createUser(data: CreateUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { UserName: data.UserName },
    });

    if (existingUser) {
      throw new HttpException('Username already exists. Please choose a different one.', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.hashPassword(data.Password);

    try {
      return this.prisma.user.create({
        data: {
          UserName: data.UserName,
          Password: hashedPassword,
          Role: data.Role || 'cashier',
          OutletCode: data.OutletCode,
          pageaccess: data.pageaccess,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new HttpException('Unique constraint violation', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    const numericId = parseInt(id);
    return this.checkUserExists(numericId); // Reuse the helper method
  }

  // Update user by ID
  async updateUser(id: string, data: Partial<UpdateUserDto>): Promise<User> {
    const numericId = parseInt(id);
    await this.checkUserExists(numericId); // Check if user exists before update

    if (data.UserName && await this.checkUsernameExists(data.UserName, numericId)) {
      throw new HttpException('Username already exists. Please choose a different one.', HttpStatus.BAD_REQUEST);
    }

    const updateData: Partial<User> = { ...data };

    try {
      return this.prisma.user.update({
        where: { id: numericId },
        data: updateData,
      });
    } catch (error) {
      throw error;
    }
  }

  // Delete user by ID
  async deleteUser(id: string): Promise<User> {
    const numericId = parseInt(id);
    await this.checkUserExists(numericId); // Check if user exists before delete

    try {
      return this.prisma.user.delete({
        where: { id: numericId },
      });
    } catch (error) {
      throw error;
    }
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
