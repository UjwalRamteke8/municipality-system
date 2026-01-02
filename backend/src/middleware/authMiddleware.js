import admin from "../../config/firebaseAdmin.js";
import User from "../models/User.js"; // <--- ADD THIS LINE
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "No authorization header provided." });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header must start with 'Bearer '." });
    }

    const idToken = authHeader.split(" ")[1];

    if (!idToken || idToken.trim() === "") {
      return res
        .status(401)
        .json({ message: "No token provided in authorization header." });
    }

    // Verify the token with Firebase Admin
    let decoded;
    try {
      decoded = await admin.auth().verifyIdToken(idToken);
    } catch (tokenError) {
      console.error("Token verification failed:", {
        code: tokenError.code,
        message: tokenError.message,
      });

      if (tokenError.code === "auth/id-token-expired") {
        return res.status(401).json({
          code: "TOKEN_EXPIRED",
          message: "Firebase ID token has expired. Please refresh your token.",
        });
      }

      return res.status(401).json({
        code: "INVALID_TOKEN",
        message: "Invalid authentication token format.",
      });
    }

    if (!decoded || !decoded.uid) {
      return res
        .status(401)
        .json({ message: "Invalid Firebase token structure." });
    }

    req.firebaseUser = decoded;

    // --- MONGO DB SYNC ---
    // This part was crashing because 'User' wasn't imported
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

    // Attach user data to the request object
    req.user = user;
    req.userId = user._id;
    req.isAdmin = user.role === "admin";
    req.isStaff = user.role === "staff"; // Crucial for your staff dashboard

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", {
      message: err.message,
    });

    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
      code: err.code || "AUTH_ERROR",
    });
  }
};

export default authMiddleware;
