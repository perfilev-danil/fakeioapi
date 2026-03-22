import type { Request, Response } from "express";
import { prisma } from "../config/db.ts";

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  res.json({ status: "success", data: users });
};
