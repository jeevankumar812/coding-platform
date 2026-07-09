import Problem from '../models/Problem.js';
import User from '../models/User.js';
import Redeem from '../models/Redeem.js';
import Submission from "../models/Submission.js";
import UserProblem from '../models/UserProblem.js';

export const createProblem = async (req, res) => {
  try {
    const { difficulty } = req.body;

    let points;
    let timeLimit;

    switch (difficulty) {
      case "Easy":
        points = 100;
        timeLimit = 5;
        break;

      case "Medium":
        points = 250;
        timeLimit = 10;
        break;

      case "Hard":
        points = 500;
        timeLimit = 25;
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid difficulty",
        });
    }

    const problem = await Problem.create({
      ...req.body,
      points,
      timeLimit,
    });

    res.status(201).json({
      success: true,
      message: "Problem Created Successfully",
      problem,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


export const updateProblem = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.difficulty) {
      switch (updateData.difficulty) {
        case "Easy":
          updateData.points = 100;
          updateData.timeLimit = 5;
          break;

        case "Medium":
          updateData.points = 250;
          updateData.timeLimit = 10;
          break;

        case "Hard":
          updateData.points = 500;
          updateData.timeLimit = 25;
          break;

        default:
          return res.status(400).json({
            success: false,
            message: "Invalid difficulty",
          });
      }
    }

    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProblem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem Updated Successfully",
      problem: updatedProblem,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


export const deleteProblem = async(req,res)=>{
    try {
        const problem = await Problem.findById(req.params.id);

        if(!problem)
        {
            return res.status(404).json({
                success:false,
                message:"Problem not found"
            });
        }

        await problem.deleteOne();

        res.status(200).json({
            success:true,
            message:"Problem Deleted"
        });


    } catch (error) {
        console.error(error);

        res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message
        });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password");

        res.status(200).json({
            success: true,
            totalUsers: users.length,
            users
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}

export const getAllProblems = async(req,res)=>{
    try {
        const problem = await Problem.find();

        res.status(200).json({
            success:true,
            totalProblems:problem.length,
            problem
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message
        });
    }
}

export const getAllRedeems = async(req,res)=>{
    try {
        const redeem = await Redeem.find().
        populate("userId","name email availablePoints").
        populate("rewardId");

        res.status(200).json({
            success:true,
            totalRedeemRequests:redeem.length,
            redeem,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
}


export const sendReward = async(req,res)=>{
    try {
        const {redeemId,giftCardCode}=req.body;

        const redeem = await Redeem.findById(redeemId);

        if(!redeem)
        {
            return res.status(404).json({
                success:false,
                message:"Redeem not found",
            });
        }

        if(redeem.status==="Sent")
        {
            return res.status(400).json({
                success:false,
                message:"Redeem already sent",
            });
        }
        
        redeem.code = giftCardCode;
        redeem.status = "Sent";

        await redeem.save();
        res.status(200).json({
            success:true,
            message:"Gift Card Sent Succefully",
            redeem,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message
        });
    }
}
export const getPendingSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      status: "Pending",
    })
      .populate("userId", "name email")
      .populate("problemId", "title difficulty points")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: submissions.length,
      submissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================================
   PUT /admin/accept/:submissionId
=========================================================== */

export const acceptSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(
      req.params.submissionId
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    if (submission.status === "Accepted") {
      return res.status(400).json({
        success: false,
        message: "Submission already accepted",
      });
    }

    const user = await User.findById(submission.userId);
    const problem = await Problem.findById(submission.problemId);

    if (!user || !problem) {
      return res.status(404).json({
        success: false,
        message: "User or Problem not found",
      });
    }

    const alreadySolved = user.solvedProblems.some(
      (id) => id.toString() === problem._id.toString()
    );

    if (!alreadySolved) {
      user.solvedProblems.push(problem._id);

      user.totalPoints += problem.points;
      user.availablePoints += problem.points;

      await user.save();
    }

    submission.status = "Accepted";
    submission.passedTestCases = problem.testCases.length;
    submission.totalTestCases = problem.testCases.length;
    submission.pointsEarned = alreadySolved ? 0 : problem.points;
    submission.isFirstSolve = !alreadySolved;

    await submission.save();

    // ===============================
    // Update UserProblem
    // ===============================

    const userProblem = await UserProblem.findOne({
      userId: submission.userId,
      problemId: submission.problemId,
    });

    if (userProblem) {
      userProblem.completed = true;
      userProblem.locked = false;
      userProblem.completedAt = new Date();

      await userProblem.save();
    }

    res.status(200).json({
      success: true,
      message: "Submission Accepted",
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
   PUT /admin/reject/:submissionId
=========================================================== */

export const rejectSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(
      req.params.submissionId
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    if (submission.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Submission has already been reviewed.",
      });
    }

    const problem = await Problem.findById(submission.problemId);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    submission.status = "Rejected";
    submission.pointsEarned = 0;

    await submission.save();

    const userProblem = await UserProblem.findOne({
      userId: submission.userId,
      problemId: submission.problemId,
    });

    if (userProblem) {
      // Count this rejected submission
      userProblem.attempts += 1;

      // Lock after maximum attempts
      if (userProblem.attempts >= problem.maxAttempts) {
        userProblem.locked = true;
      }

      await userProblem.save();
    }

    res.status(200).json({
      success: true,
      message: userProblem?.locked
        ? "Submission Rejected. Problem Locked."
        : "Submission Rejected. You can submit again.",
      submission,
      attemptsUsed: userProblem?.attempts,
      attemptsRemaining: problem.maxAttempts - userProblem?.attempts,
      locked: userProblem?.locked,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};