import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const restaurant = await prisma.restaurant.create({
    data: { name: 'Montana Ristorante' },
  });

  await prisma.product.createMany({
    data: [
      { name: 'Pasta Alfredo', price: 14.5, restaurantId: restaurant.id },
      { name: 'Pizza Margherita', price: 12, restaurantId: restaurant.id },
      { name: 'Kebab Roll', price: 10, restaurantId: restaurant.id },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
