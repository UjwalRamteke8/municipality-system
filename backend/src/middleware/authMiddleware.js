import admin from "../../config/firebaseAdmin.js";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No authorization token provided." });
    }

    const idToken = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(idToken);

    if (!decoded || !decoded.uid) {
      return res.status(401).json({ message: "Invalid Firebase token." });
    }

    req.firebaseUser = decoded;

    // 1. Try finding by firebaseUid (Best method)
    let user = await User.findOne({ firebaseUid: decoded.uid });

    // 2. If not found, try finding by email (Legacy sync)
    if (!user && decoded.email) {
      user = await User.findOne({ email: decoded.email });
      if (user) {
        // Link the existing account to Firebase
        user.firebaseUid = decoded.uid;
        await user.save();
      }
    }

    // 3. Create new user if doesn't exist
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
        // Fallback if name is missing from Google/Firebase
        name: decoded.name || "New Citizen",
        role: "citizen",
      });
    }

    req.user = user;
    req.userId = user._id;
    req.isAdmin = user.role === "admin";
    req.isStaff = user.role === "staff";

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({ message: "Unauthorized: " + err.message });
  }
};

export default authMiddleware;
