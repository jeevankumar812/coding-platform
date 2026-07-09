import Problem from "../models/Problem.js";
import UserProblem from "../models/UserProblem.js";
export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find().select(
      "title difficulty points createdAt"
    );

    res.status(200).json({
      success: true,
      totalProblems: problems.length,
      problems,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem Not Found",
      });
    }

    // Show only public test cases
    const sampleTestCases = problem.testCases.filter(
      (test) => !test.isHidden
    );

    res.status(200).json({
      success: true,
      problem: {
        _id: problem._id,
        title: problem.title,
        difficulty: problem.difficulty,
        statement: problem.statement,
        inputFormat: problem.inputFormat,
        outputFormat: problem.outputFormat,
        constraints: problem.constraints,
        sampleInput: problem.sampleInput,
        sampleOutput: problem.sampleOutput,
        explanation: problem.explanation,
        points: problem.points,
        testCases: sampleTestCases,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const startProblem = async (req, res) => {
  try {
    const problemId = req.params.id;
    const userId = req.user._id;

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    let userProblem = await UserProblem.findOne({
      userId,
      problemId,
    });

    if (!userProblem) {
      const startedAt = new Date();

      const expiresAt = new Date(
        startedAt.getTime() + problem.timeLimit * 60 * 1000
      );

      userProblem = await UserProblem.create({
        userId,
        problemId,
        startedAt,
        expiresAt,
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem Started",
      userProblem,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};