import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    serviceType: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    attachments: [{ type: String }], // array of file paths
    paymentRequired: { type: Boolean, default: false },
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

export default mongoose.model("ServiceRequest", serviceSchema);
