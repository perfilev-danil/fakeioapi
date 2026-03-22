import type { Request, Response } from "express";
import { prisma } from "../config/db.ts";

export const getMetrics = async (req: Request, res: Response) => {
  const metrics = await prisma.metric.findMany({
    orderBy: { createdAt: "desc" },
    take: 100, // last 100 metrics
  });
  res.json({ status: "success", data: metrics });
};

export const getMetricById = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const metric = await prisma.metric.findUnique({ where: { id } });
  if (!metric) return res.status(404).json({ error: "Metric not found" });
  res.json({ status: "success", data: metric });
};
