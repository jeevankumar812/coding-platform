import express from "express";
import {
  submitSolution,
  getSubmissionById,
  getMySubmissions,
} from "../controllers/submissionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/submit", protect, submitSolution);

router.get("/my-submissions", protect, getMySubmissions);

router.get("/:id", protect, getSubmissionById);

export default router;