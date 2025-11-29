import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    storage: {
      type: String,
      enum: ["local", "cloudinary"],
      default: "cloudinary",
    },

    s3Key: { type: String },
    fileName: { type: String, required: true },
    originalName: { type: String },
    dateTime: { type: Date, default: Date.now },
    latitude: { type: Number },
    longitude: { type: Number },
    locationLabel: { type: String },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Photo", photoSchema);
