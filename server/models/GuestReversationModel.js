import mongoose  from "mongoose";

const GuestReversationSchema=new mongoose.Schema({

    fullName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    companyName:{
        type:String,
        required:true,
        trim:true
    },
    shotLocation:{
        type:String,
        required:true,
        trim:true
    },
    phoneNumber:{
        type:String,
        required:true,
        trim:true
    },
    note:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        type:Date,
        required:true,
    },
     createdAt: {
        type: Date,
        default: Date.now
    }


})

export const GuestReversation=mongoose.model("GuestReversation",GuestReversationSchema);