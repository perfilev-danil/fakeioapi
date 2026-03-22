import express from "express";
import { getMetrics, getMetricById } from "../controllers/metricController.ts";

const router = express.Router();

router.get("/", getMetrics); // GET /metrics -> last N metrics
router.get("/:id", getMetricById); // GET /metrics/:id -> single metric by ID

export default router;
