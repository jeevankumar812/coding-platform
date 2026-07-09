import Submission from "../models/Submission.js";
import Problem from "../models/Problem.js";
import UserProblem from "../models/UserProblem.js";
/* ===========================================================
   POST /submit
=========================================================== */

export const submitSolution = async (req, res) => {
  try {
    const { problemId, language, code } = req.body;

    if (!problemId || !language || !code) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    const userProblem = await UserProblem.findOne({
      userId: req.user._id,
      problemId,
    });

    if (!userProblem) {
      return res.status(400).json({
        success: false,
        message: "Please start the problem first.",
      });
    }

    if (userProblem.completed) {
      return res.status(400).json({
        success: false,
        message: "You have already solved this problem.",
      });
    }

    if (userProblem.locked) {
      return res.status(403).json({
        success: false,
        message: "This problem is locked.",
      });
    }

    // Time check
    if (new Date() > userProblem.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "Time Limit Exceeded",
      });
    }

    // Check if a previous submission is still pending
    const pendingSubmission = await Submission.findOne({
      userId: req.user._id,
      problemId,
      status: "Pending",
    });

    if (pendingSubmission) {
      return res.status(400).json({
        success: false,
        message:
          "Your previous submission is still under review. Please wait for the admin review.",
      });
    }

    const submission = await Submission.create({
      userId: req.user._id,
      problemId,
      language,
      code,
      status: "Pending",
    });

    userProblem.lastSubmission = submission._id;
    await userProblem.save();

    res.status(201).json({
      success: true,
      message: "Submission sent for admin review.",
      submission,
      attemptsUsed: userProblem.attempts,
      attemptsRemaining: problem.maxAttempts - userProblem.attempts,
      expiresAt: userProblem.expiresAt,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* ===========================================================
   GET /submission/:id
=========================================================== */

export const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate("userId", "name email")
      .populate("problemId", "title difficulty points");

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    res.status(200).json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================================
   GET /my-submissions
=========================================================== */

export const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      userId: req.user._id,
    })
      .populate("problemId", "title difficulty points")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: submissions.length,
      submissions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};