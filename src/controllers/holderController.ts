import type { Request, Response } from "express";
import { prisma } from "../config/db.ts";

export const getHoldings = async (req: Request, res: Response) => {
  const holdings = await prisma.holding.findMany();
  res.json({ message: "success", data: holdings });
};

export const createHolding = async (req: Request, res: Response) => {
  try {
    const { userId, coinId, amount } = req.body;
    const holding = await prisma.holding.create({
      data: {
        userId,
        coinId,
        amount,
      },
    });
    res.status(201).json({ message: "success", data: holding });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const changeHolding = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { userId, coinId, amount } = req.body;

    const holding = await prisma.holding.update({
      where: {
        id: id,
      },
      data: {
        userId,
        coinId,
        amount,
      },
    });

    res.json({ message: "success", data: holding });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
