export type OrderStatus = 'OPEN' | 'PAID' | 'CANCELLED';

export class OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export class Order {
  id: number;
  status: OrderStatus;
  total: number;
  createdBy: number; // userId
  createdAt: Date;
  items: OrderItem[];
}
