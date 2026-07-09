import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },

  output: {
    type: String,
    required: true,
  },

  isHidden: {
    type: Boolean,
    default: true,
  },
});

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Arrays",
        "Strings",
        "Math",
        "Simulation",
        "Searching",
        "Sorting",
        "Recursion",
        "Greedy",
        "Dynamic Programming",
        "Graphs",
        "Trees",
        "College",
        "Finance",
        "Games",
        "Healthcare",
        "Scheduling",
        "Custom"
      ],
      default: "Custom",
    },

    statement: {
      type: String,
      required: true,
    },

    inputFormat: {
      type: String,
    },

    outputFormat: {
      type: String,
    },

    constraints: {
      type: String,
    },

    sampleInput: {
      type: String,
    },

    sampleOutput: {
      type: String,
    },

    explanation: {
      type: String,
    },

    points: {
      type: Number,
      required: true,
      enum: [100, 250, 500],
    },

    timeLimit: {
      type: Number, // Minutes
      required: true,
      enum: [5, 10, 25],
    },

    maxAttempts: {
      type: Number,
      default: 3,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    testCases: [testCaseSchema],

    editorial: {
      cpp: String,
      java: String,
      python: String,
    },
  },
  {
    timestamps: true,
    collection: "problems",
  }
);

const Problem =
  mongoose.models.Problem ||
  mongoose.model("Problem", problemSchema);

export default Problem;