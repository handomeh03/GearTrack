import mongoose  from "mongoose";

const ItemReversationSchema=new mongoose.Schema({
  startDate:{
    type:Date,
    required:true
  },
  endDate:{
    type:Date,
    required:true
  },
  equipment:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "Equipment",
     required: true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
   createdAt: {
        type: Date,
        default: Date.now
    }

})
ItemReversationSchema.pre("save", async function(next) {
  const ItemReversationModel = mongoose.model("ItemReversation"); 
  
  const overlapping = await ItemReversationModel.findOne({
    equipment: this.equipment,
    $or: [
      { startDate: { $lte: this.endDate }, endDate: { $gte: this.startDate } }
    ]
  });

  if (overlapping) {
    return next(new Error("This equipment is already reserved in the selected time range."));
  }
  next();
});


export const ItemReversation=mongoose.model("ItemReversation",ItemReversationSchema);