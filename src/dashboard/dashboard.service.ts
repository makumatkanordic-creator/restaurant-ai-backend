import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getSummary() {
    return {
      ordersToday: 12,
      revenueToday: 450,
      restaurantStatus: 'OPEN',
    };
  }

  getTodayStats() {
    return {
      totalOrders: 12,
      totalRevenue: 450,
      averageOrderValue: 37.5,
      topItem: 'Pepperoni Pizza',
    };
  }
}
