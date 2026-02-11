import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersAIService {
  constructor(private prisma: PrismaService) {}

  async summarizeOrder(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException('الطلب غير موجود');
    }

    const itemsText = order.items
      .map(i => `${i.name} ×${i.quantity}`)
      .join('، ');

    const summary = `الطلب يحتوي على ${itemsText || 'بدون أصناف'}، المجموع ${order.total}€، الحالة ${order.status}`;

    return {
      orderId: order.id,
      summary,
    };
  }

  async upsellSuggestions(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException('الطلب غير موجود');
    }

    const productNames = order.items.map(i => i.name.toLowerCase());

    const suggestions: string[] = [];

    // قواعد Upsell بسيطة (ذكية)
    if (productNames.some(n => n.includes('pizza'))) {
      suggestions.push('مشروب غازي', 'صوص إضافي');
    }

    if (productNames.some(n => n.includes('burger'))) {
      suggestions.push('بطاطس مقلية', 'مشروب');
    }

    if (order.total < 30) {
      suggestions.push('تحلية اليوم');
    }

    return {
      orderId: order.id,
      suggestions: [...new Set(suggestions)],
    };
  }

  async fullAI(orderId: number) {
    const summary = await this.summarizeOrder(orderId);
    const upsell = await this.upsellSuggestions(orderId);

    return {
      ...summary,
      upsell: upsell.suggestions,
    };
  }
}
