import express from "express";
import {
  getHoldings,
  createHolding,
  changeHolding,
} from "../controllers/holderController.ts";

const router = express.Router();

router.get("/", getHoldings);
router.post("/create", createHolding);
router.patch("/change/:id", changeHolding);

export default router;
