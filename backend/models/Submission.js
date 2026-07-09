import mongoose, { mongo } from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        userId : {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required :true
        },

        problemId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Problem",
            required:true
        },

        language:{
            type:String,
            enum:["cpp","java","python"],
            required:true
        },
        code :{
            type:String,
            required:true
        },

        status:{
    type:String,
    enum:[
        "Pending",
        "Accepted",
        "Rejected"
    ],
    default:"Pending"
},
        passedTestCases:{
            type:Number,
            default:0
        },
    },

    {timestamps:true,
    collections:"submissions"
    }
);


const Submission =
  mongoose.models.Submission ||
  mongoose.model("Submission", submissionSchema);

export default Submission;