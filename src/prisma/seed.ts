import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  // =========================
  // 1️⃣ Create Restaurant
  // =========================
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Montana Ristorante',
    },
  });

  console.log('🍽️ Restaurant created:', restaurant.id);

  // =========================
  // 2️⃣ Create Order
  // =========================
  const order = await prisma.order.create({
    data: {
      status: 'OPEN',
      total: 29.0,
      restaurantId: restaurant.id,
    },
  });

  console.log('🧾 Order created:', order.id);

  // =========================
  // 3️⃣ Create Order Items
  // =========================
  await prisma.orderItem.createMany({
    data: [
      {
        name: 'Pasta Alfredo',
        price: 14.5,
        quantity: 2,
        orderId: order.id,
      }
    ],
  });

  console.log('📦 Order items created');
  console.log('✅ Seeding finished successfully');
}

main()
  .catch((error) => {
    console.error('❌ Seed error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
