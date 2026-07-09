import express from "express";
import { getAllRewards } from "../controllers/rewardController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllRewards);

export default router;