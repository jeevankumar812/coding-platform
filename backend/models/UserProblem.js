import mongoose from "mongoose";

const userProblemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    locked: {
      type: Boolean,
      default: false,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    expiresAt: {
    type: Date,
    default: null,
},

    completedAt: {
      type: Date,
      default: null,
    },

    pasteDetected: {
      type: Boolean,
      default: false,
    },

    eligibleForPoints: {
      type: Boolean,
      default: true,
    },

    lastSubmission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "userproblems",
  }
);

// Prevent duplicate records for the same user & problem
userProblemSchema.index(
  { userId: 1, problemId: 1 },
  { unique: true }
);

const UserProblem =
  mongoose.models.UserProblem ||
  mongoose.model("UserProblem", userProblemSchema);

export default UserProblem;