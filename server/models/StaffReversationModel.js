import mongoose  from "mongoose";

const staffReversationSchema=new mongoose.Schema({
   Avaiableuser:[
        { type: mongoose.Schema.Types.ObjectId, ref: "User",required:true } 
    ],
    date:{
        type:Date,
        required:true,
    },
     createdAt: {
        type: Date,
        default: Date.now
    }


});

staffReversationSchema.path("Avaiableuser").validate((e)=>{
      return e.length > 0;
},"At least one user is required")

export const staffReversation=mongoose.model("staffReversation",staffReversationSchema);