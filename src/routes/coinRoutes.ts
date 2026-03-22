import express from "express";
import { getCoinById, getCoins } from "../controllers/coinController.ts";

const router = express.Router();

router.get("/", getCoins);
router.get("/:id", getCoinById);

export default router;
