import { Module } from '@nestjs/common';
import { MasterInfoCodeController } from 'src/controllers/masterinfocode.controller';
import { MasterInfoCodeService } from 'src/microservices/masterinfocode.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [MasterInfoCodeController],
  providers: [MasterInfoCodeService, PrismaService],
})
export class MasterInfoCodeModule {}
