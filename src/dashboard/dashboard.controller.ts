import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get('summary')
  getSummary() {
    return this.dashboardService.getSummary();
  }

  @UseGuards(JwtAuthGuard)
  @Get('today')
  getToday() {
    return this.dashboardService.getTodayStats();
  }
}
