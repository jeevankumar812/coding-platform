import Redeem from "../models/Redeem.js";
import Reward from "../models/Rewards.js";
import User from "../models/User.js";


export const redeemReward = async (req, res) => {
  try {
    const { rewardId } = req.body;

    const user = await User.findById(req.user._id);

    const reward = await Reward.findById(rewardId);

    if (!reward) {
      return res.status(404).json({
        success: false,
        message: "Reward not found",
      });
    }

    if (user.availablePoints < reward.pointsRequired) {
      return res.status(400).json({
        success: false,
        message: "Not enough points",
      });
    }

    const pendingRedeem = await Redeem.findOne({
      userId: user._id,
      rewardId,
      status: "Pending",
    });

    if (pendingRedeem) {
      return res.status(400).json({
        success: false,
        message: "You already have a pending redeem request.",
      });
    }

    user.availablePoints -= reward.pointsRequired;

    await user.save();

    const redeem = await Redeem.create({
      userId: user._id,
      rewardId,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Redeem request submitted successfully.",
      redeem,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getMyRedeems = async (req, res) => {
  try {

    const redeems = await Redeem.find({
      userId: req.user._id,
    })
      .populate("rewardId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: redeems.length,
      redeems,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};