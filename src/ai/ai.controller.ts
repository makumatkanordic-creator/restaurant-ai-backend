import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ask') // ✅ مسار AI فقط
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  ask(@Body() body: { budget: number }) {
    return this.aiService.suggestOrder(body.budget);
  }
}
