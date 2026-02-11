import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {

  constructor(private prisma: PrismaService) {}

  // ===============================
  // 🔥 AUTO PLAN + SAVE ORDER
  // ===============================
  async autoPlan(
    budget: number,
    peopleCount: number,
    dietType: string,
  ) {

    const products = await this.prisma.product.findMany({
      where: { isActive: true },
    });

    const mains = products.filter(p => p.category === 'main');
    const drinks = products.filter(p => p.category === 'drink');

    let bestPlan: any = null;
    let bestUtilization = 0;

    for (const main of mains) {
      for (const drink of drinks) {

        const total =
          (main.price * peopleCount) +
          (drink.price * peopleCount);

        if (total <= budget) {

          const utilization = total / budget;

          if (utilization > bestUtilization) {
            bestUtilization = utilization;
            bestPlan = { main, drink, total };
          }
        }
      }
    }

    if (!bestPlan) {
      return { message: 'No plan fits budget' };
    }

    const order = await this.prisma.order.create({
      data: {
        status: 'OPEN',
        total: bestPlan.total,
        restaurantId: 1,
        items: {
          create: [
            {
              name: bestPlan.main.name,
              price: bestPlan.main.price,
              quantity: peopleCount,
            },
            {
              name: bestPlan.drink.name,
              price: bestPlan.drink.price,
              quantity: peopleCount,
            }
          ]
        }
      },
      include: { items: true }
    });

    return order;
  }

  // ===============================
  // 🔥 UPDATE ORDER STATUS
  // ===============================
  async updateOrderStatus(orderId: number, status: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: status as any },
    });
  }

  // ===============================
  // 🔥 GET ALL ORDERS
  // ===============================
  async getAllOrders() {
    return this.prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  // ===============================
  // 🔥 DASHBOARD STATS
  // ===============================
  async getDashboardStats() {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ordersToday = await this.prisma.order.findMany({
      where: {
        createdAt: { gte: today }
      }
    });

    const totalRevenue = ordersToday.reduce(
      (sum, order) => sum + order.total,
      0
    );

    const openOrders =
      ordersToday.filter(o => o.status !== 'COMPLETED').length;

    return {
      ordersToday: ordersToday.length,
      totalRevenue,
      openOrders
    };
  }
}
