    import mongoose from "mongoose";

    const userSchema = new mongoose.Schema(
        {
            name :{
                type : String,
                required:true
            },
            email :{
                type :String,
                required:true,
                unique:true
            },
            password: {
                type:String,
                required:true
            },

            totalPoints:{
                type:Number,
                default:0
            },
            availablePoints:{
                type:Number,
                default:0
            },
            solvedProblems:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Problem"
                },
            ],

            redeemedRewards:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Redeem"
                },
            ],

            role :{
                type:String,
                enum:["user","admin"],
                default:"user"
            },
        },

        {
            timestamps:true,
        }
    );

    const User = mongoose.model('User',userSchema);

    export default User;    