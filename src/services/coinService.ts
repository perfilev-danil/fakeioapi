import { prisma } from "../config/db.ts";

export const getCoins = () => {
  const coins = prisma.coin.findMany();

  return coins;
};
