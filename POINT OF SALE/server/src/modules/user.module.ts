import { Module } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/microservices/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
