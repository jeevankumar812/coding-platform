import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        rewardType:{
            type:String,
            default:"Amazon Gift Card",
        },

        amount :{
            type:Number,
            required:true,
        },

        pointsRequired:{
            type:String,
            required:true,
        },

        available:{
            type:Number,
            defalut:0
        },
    },

    {timestamps:true}
);

const Reward = mongoose.model('Reward',rewardSchema);

export default Reward;