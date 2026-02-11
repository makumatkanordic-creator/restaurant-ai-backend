import {
  Body,
  Controller,
  Post,
  Patch,
  Param,
  Get
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AutoPlanDto } from './dto/auto-plan.dto';

@Controller('orders')
export class OrdersController {

  constructor(private readonly ordersService: OrdersService) {}

  // 🔥 AUTO PLAN
  @Post('auto-plan')
  autoPlan(@Body() body: AutoPlanDto) {
    return this.ordersService.autoPlan(
      body.budget,
      body.peopleCount,
      body.dietType,
    );
  }

  // 🔥 UPDATE STATUS
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.ordersService.updateOrderStatus(
      Number(id),
      status,
    );
  }

  // 🔥 GET ALL ORDERS
  @Get()
  getAll() {
    return this.ordersService.getAllOrders();
  }

  // 🔥 DASHBOARD
  @Get('dashboard')
  dashboard() {
    return this.ordersService.getDashboardStats();
  }
}
