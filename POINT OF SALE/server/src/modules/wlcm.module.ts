import { Module } from '@nestjs/common';
import { WlcmService } from '../microservices/wlcm.service';
import { WlcmController } from '../controllers/wlcm.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [WlcmController],
  providers: [WlcmService, PrismaService],
})
export class WlcmModule {}
