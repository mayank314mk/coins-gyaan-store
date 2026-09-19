import { PrismaClient } from "@prisma/client";
import { seedProducts } from "../lib/products";

const prisma = new PrismaClient();

async function main() {
  for (const product of seedProducts) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        backImage: product.backImage,
        category: product.category,
        isTrending: product.isTrending ?? false,
        description: product.description,
      },
      create: {
        ...product,
        isTrending: product.isTrending ?? false,
        stock: 1,
      },
    });
  }
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (adminEmail) {
    const result = await prisma.user.updateMany({ where: { email: adminEmail }, data: { role: "ADMIN" } });
    console.log(result.count ? `Promoted ${adminEmail} to ADMIN.` : `No user found for ${adminEmail}.`);
  }
  console.log(`Seeded ${seedProducts.length} collectible coins.`);
}

main().finally(() => prisma.$disconnect());
