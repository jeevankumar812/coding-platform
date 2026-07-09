import Reward from "../models/Rewards.js";

/* ===========================================================
   GET /rewards
=========================================================== */

export const getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.find().sort({
      pointsRequired: 1,
    });

    res.status(200).json({
      success: true,
      totalRewards: rewards.length,
      rewards,
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