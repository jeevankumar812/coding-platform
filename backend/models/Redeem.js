import mongoose, { mongo } from "mongoose";

const redeemSchema = new mongoose.Schema(
    {
        userId :{
            type:mongoose.Schema.Types.ObjectId,
            ref :"User",
            required:true
        },

        rewardId :{
            type:mongoose.Schema.Types.ObjectId,
            ref :"Reward",
            required:true
        },

        code :{
            type:String,
            default:""
        },

        status:{
            type:String,
            enum:["Pending","Sent","Claimed"],
            default:"Pending",
        },
    },

    {
        timestamps:true,
    }
);

const Redeem = mongoose.model('Redeem',redeemSchema);
export default Redeem;