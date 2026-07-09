import { protect } from "../middlewares/authMiddleware.js";
import {
  getAllProblems,
  getProblemById,
  startProblem,
} from "../controllers/problemController.js";
import router from "./authRoutes.js";

router.get("/", protect, getAllProblems);

router.get("/:id", protect, getProblemById);

router.post("/:id/start", protect, startProblem);
export default router;