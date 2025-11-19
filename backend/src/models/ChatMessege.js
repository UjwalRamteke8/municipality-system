import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    room: { type: String, required: true },
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    meta: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("ChatMessage", chatSchema);
