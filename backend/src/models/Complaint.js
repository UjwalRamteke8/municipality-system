import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // file path
    location: {
      lat: Number,
      lng: Number,
      address: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "rejected"],
      default: "pending",
    },
    remark: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
