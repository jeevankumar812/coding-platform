import express from "express";
import {
  redeemReward,
  getMyRedeems,
} from "../controllers/redeemController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/redeem", protect, redeemReward);

router.get("/my-redeems", protect, getMyRedeems);

export default router;