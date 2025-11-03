import mongoose  from "mongoose";

const EquipmentSchema = new mongoose.Schema({
   code: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
   },
   name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
   },
   category: {
      type: String,
      enum: ["camera", "lens", "lighting", "audio", "drone", "accessories"],
      required: true,
      lowercase: true
   },
   condition: {
      type: String,
      lowercase: true,
      enum: ["available", "out", "needscharging"],
      default:"available"
   },
   location: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
   },
   note: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
   },
   purchaseDate: {
      type: Date,
      required: true
   },
   photo: {
      type: String,
      required: true
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export const Equipment = mongoose.model("Equipment", EquipmentSchema);


