import type { Request, Response } from "express";
import { prisma } from "../config/db.ts";

export const getCoins = async (req: Request, res: Response) => {
  const coins = await prisma.coin.findMany();

  res.json({ status: "success", data: coins });
};

export const getCoinById = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const coin = await prisma.coin.findUnique({
    where: {
      id,
    },
  });
  if (!coin) {
    return res.status(404).json({ error: "Coin not found" });
  }
  return res.json({
    message: "success",
    data: coin,
  });
};
