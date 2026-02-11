export type Category = 'main' | 'drink' | 'extra';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  priority: number;
}

export function buildSmartOrder(
  budget: number,
  products: Product[]
) {
  let remaining = budget;
  const items: any[] = [];

  const mainBudget = budget * 0.65;
  const drinkBudget = budget * 0.15;

  // MAIN
  const mains = products
    .filter(p => p.category === 'main' && p.price <= mainBudget)
    .sort((a, b) => b.priority - a.priority);

  if (!mains.length) {
    return { budget, items: [], total: 0, remaining: budget };
  }

  const main = mains[0];
  items.push({ type: 'main', ...main });
  remaining -= main.price;

  // DRINK
  const drinks = products.filter(
    p =>
      p.category === 'drink' &&
      p.price <= drinkBudget &&
      p.price <= remaining
  );

  if (drinks.length) {
    items.push({ type: 'drink', ...drinks[0] });
    remaining -= drinks[0].price;
  }

  // EXTRA (اختياري)
  const extras = products
    .filter(p => p.category === 'extra' && p.price <= remaining)
    .sort((a, b) => a.price - b.price);

  if (extras.length) {
    items.push({ type: 'extra', ...extras[0] });
    remaining -= extras[0].price;
  }

  return {
    budget,
    items,
    total: budget - remaining,
    remaining
  };
}
