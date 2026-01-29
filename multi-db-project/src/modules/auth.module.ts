import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/common/cache.service';
import { TenantPrismaProvider } from 'src/common/tenant-prisma.provider';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, JwtService, CacheService, TenantPrismaProvider],
})
export class AuthModule {}
