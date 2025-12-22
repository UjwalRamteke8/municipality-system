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

    // Verify the token with Firebase Admin
    const decoded = await admin.auth().verifyIdToken(idToken);

    if (!decoded || !decoded.uid) {
      return res.status(401).json({ message: "Invalid Firebase token." });
    }

    req.firebaseUser = decoded;

    // Finding/Syncing User with MongoDB
    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user && decoded.email) {
      user = await User.findOne({ email: decoded.email });
      if (user) {
        user.firebaseUid = decoded.uid;
        await user.save();
      }
    }

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
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
    console.error("Auth Middleware Error:", err.code || err.message);

    // SPECIFIC FIX: Check if the error is due to expiration
    if (err.code === "auth/id-token-expired") {
      return res.status(401).json({
        code: "TOKEN_EXPIRED",
        message: "Firebase ID token has expired. Please get a fresh token.",
      });
    }

    return res.status(401).json({ message: "Unauthorized: " + err.message });
  }
};

export default authMiddleware;
