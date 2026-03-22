import "dotenv/config";

import { prisma } from "./config/db.ts";

async function main() {
  await prisma.coin.createMany({
    data: [
      { name: "Bitcoin", symbol: "BTC", apiId: "bitcoin" },
      { name: "Ethereum", symbol: "ETH", apiId: "ethereum" },
      { name: "Solana", symbol: "SOL", apiId: "solana" },
    ],
    skipDuplicates: true,
  });

  console.log("Coins seeded");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
