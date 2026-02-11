import { Controller, Get, Param } from '@nestjs/common';
import { OrdersAIService } from './orders.ai.service';

@Controller('orders/ai')
export class OrdersAIController {
  constructor(private readonly aiService: OrdersAIService) {}

  @Get(':id/summary')
  summary(@Param('id') id: string) {
    return this.aiService.summarizeOrder(Number(id));
  }

  @Get(':id/upsell')
  upsell(@Param('id') id: string) {
    return this.aiService.upsellSuggestions(Number(id));
  }

  @Get(':id/full')
  full(@Param('id') id: string) {
    return this.aiService.fullAI(Number(id));
  }
}
