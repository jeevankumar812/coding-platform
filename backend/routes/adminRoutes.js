import express from 'express';
import { acceptSubmission, createProblem, deleteProblem, getAllProblems, getAllRedeems, getAllUsers, getPendingSubmissions, rejectSubmission, sendReward, updateProblem } from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';
import adminOnly from '../middlewares/adminMiddleware.js'
const router = express.Router();

router.post('/create-problem',protect ,adminOnly,createProblem);
router.put('/problem/:id',protect,adminOnly, updateProblem);
router.delete('/problem/:id',protect,adminOnly,deleteProblem);
router.get('/users',protect,adminOnly,getAllUsers);
router.get('/problems', protect,adminOnly,getAllProblems);
router.get('/redeems',protect,adminOnly,getAllRedeems);
router.post('/sendReward',protect,adminOnly,sendReward);
router.get(
  "/pending-submissions",
  protect,
  adminOnly,
  getPendingSubmissions
);

router.put(
  "/accept/:submissionId",
  protect,
  adminOnly,
  acceptSubmission
);

router.put(
  "/reject/:submissionId",
  protect,
  adminOnly,
  rejectSubmission
);


export default router;