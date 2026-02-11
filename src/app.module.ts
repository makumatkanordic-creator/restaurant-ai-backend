import { Module } from '@nestjs/common';
import { AiModule } from './ai/ai.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    AiModule,
    OrdersModule,
  ],
})
export class AppModule {}
