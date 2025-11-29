// backend/src/middleware/authMiddleware.js
import admin from "../../config/firebaseAdmin.js";
import User from "../models/User.js";

/**
 * Verifies Firebase ID token from Authorization header:
 *   Authorization: Bearer <firebase_id_token>
 *
 * Attaches:
 *   req.firebaseUser -> decoded token (uid, email, name, etc.)
 *   req.user -> Mongoose User doc (found or created)
 *   req.userId -> mongoose _id
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No authorization token provided." });
    }

    const idToken = authHeader.split(" ")[1];
    if (!idToken) {
      return res.status(401).json({ message: "Invalid authorization token." });
    }

    // Verify token with Firebase Admin
    const decoded = await admin.auth().verifyIdToken(idToken);
    if (!decoded || !decoded.uid) {
      return res.status(401).json({ message: "Invalid Firebase token." });
    }

    // decoded contains uid, email, name, picture, etc.
    req.firebaseUser = decoded;

    // Try to find existing user by firebaseUid
    let user = await User.findOne({ firebaseUid: decoded.uid });

    // If not found, try by email
    if (!user && decoded.email) {
      user = await User.findOne({ email: decoded.email });
      // If found by email, attach firebaseUid for future
      if (user) {
        user.firebaseUid = decoded.uid;
        await user.save();
      }
    }

    // If still not found, create a minimal user record
    if (!user) {
      const newUserData = {
        firebaseUid: decoded.uid,
        email: decoded.email || undefined,
        name: decoded.name || undefined,
        // set role or other defaults here if you want
      };
      user = await User.create(newUserData);
    }

    // Attach to request
    req.user = user;
    req.userId = user._id;

    // optional convenience flags (if your User model has role)
    req.isAdmin = user.role === "admin";
    req.isStaff = user.role === "staff";

    return next();
  } catch (err) {
    console.error("Auth Error:", err.message || err);
    return res
      .status(401)
      .json({ message: "Unauthorized. Token verification failed." });
  }
};

export default authMiddleware;
