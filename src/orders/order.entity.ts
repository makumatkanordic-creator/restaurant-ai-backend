export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  status: 'OPEN' | 'CLOSED';
  items: OrderItem[];
  total: number;
  createdAt: Date;
}
