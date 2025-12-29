import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, unique: true, sparse: true },
    name: { type: String, required: false, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["citizen", "staff", "admin"],
      default: "citizen",
    },
    // ADDED: Required for staff login to work
    department: {
      type: String,
      required: false,
      default: "general",
    },
    address: { type: String },
    password: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
