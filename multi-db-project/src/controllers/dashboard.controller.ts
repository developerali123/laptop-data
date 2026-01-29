import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { DashboardService } from 'src/services/dashboard.service';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly Service: DashboardService) {}

  @Get()
  @ApiOperation({ summary: 'Get dashboard statistics with counts' })
  async getDashboardStats() {
    return this.Service.getCounts();
  }
}
