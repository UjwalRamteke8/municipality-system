// MongoDB connection setup\nmodule.exports = {};
// backend/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`🟢 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("🔴 MongoDB connection error:", error.message);

    // Retry connection after 5 sec
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
