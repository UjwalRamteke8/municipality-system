import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // FIX 1: Add firebaseUid so the middleware can find users later
    firebaseUid: { type: String, unique: true, sparse: true },

    // FIX 2: Ensure required is explicitly false
    name: { type: String, required: false, trim: true },

    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["citizen", "staff", "admin"],
      default: "citizen",
    },
    address: { type: String },

    // FIX 3: Ensure password is NOT required (for Google/Firebase logins)
    password: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
