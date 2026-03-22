import { prisma } from "../config/db.ts";
import { fetchPrices } from "./priceService.ts";

interface Coin {
  coin: string;
  metric: {
    id: string;
    price: number;
    coinId: string;
    createdAt: Date;
  };
}

export const createMetrics = async () => {
  const prices = await fetchPrices();
  const coins = await prisma.coin.findMany();
  const results: Coin[] = [];

  if (!prices) {
    return results;
  }

  for (const coin of coins) {
    const price = prices[coin.apiId]?.usd;
    if (!price) continue;

    const metric = await prisma.metric.create({
      data: {
        coinId: coin.id,
        price,
      },
    });

    results.push({
      coin: coin.symbol,
      metric,
    });
  }
  return results;
};
