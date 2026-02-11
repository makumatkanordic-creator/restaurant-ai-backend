import { Injectable } from '@nestjs/common';
import { buildSmartOrder, Product } from './smart-order';

@Injectable()
export class AiService {

  // مؤقتًا بيانات ثابتة (بعدها نربط Prisma)
  private products: Product[] = [
    { id: 1, name: 'Pasta Alfredo', price: 16.5, category: 'main', priority: 5 },
    { id: 2, name: 'Rullakebab', price: 14.5, category: 'main', priority: 4 },
    { id: 3, name: '0.33l Juoma', price: 3, category: 'drink', priority: 5 },
    { id: 4, name: 'Parmesan & Basil Fries', price: 10, category: 'extra', priority: 3 }
  ];

  suggestOrder(budget: number) {
    return buildSmartOrder(budget, this.products);
  }
}
