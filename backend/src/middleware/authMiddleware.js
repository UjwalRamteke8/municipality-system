import admin from "../../config/firebaseAdmin.js";
import User from "../models/User.js";

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
        tokenLength: idToken.length,
        tokenStart: idToken.substring(0, 20),
      });

      // Specific error handling
      if (tokenError.code === "auth/id-token-expired") {
        return res.status(401).json({
          code: "TOKEN_EXPIRED",
          message: "Firebase ID token has expired. Please refresh your token.",
        });
      }

      if (
        tokenError.code === "auth/argument-error" ||
        tokenError.code === "auth/invalid-argument"
      ) {
        return res.status(401).json({
          code: "INVALID_TOKEN",
          message:
            "Invalid authentication token format. Token must be a valid JWT.",
        });
      }

      throw tokenError;
    }

    if (!decoded || !decoded.uid) {
      return res
        .status(401)
        .json({ message: "Invalid Firebase token structure." });
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
    console.error("Auth Middleware Error:", {
      code: err.code || "UNKNOWN",
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });

    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
      code: err.code || "AUTH_ERROR",
    });
  }
};

export default authMiddleware;
