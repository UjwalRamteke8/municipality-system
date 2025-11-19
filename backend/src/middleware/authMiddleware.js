// JWT and role-based access control
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "No authorization token provided." });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token." });
    }

    // Attach userId to request
    req.userId = decoded.id;

    // Attach full user object (without password)
    const user = await User.findById(decoded.id).select("-password");
    req.user = user;

    // Add role flags
    req.isAdmin = user.role === "admin";
    req.isStaff = user.role === "staff";

    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    return res
      .status(401)
      .json({ message: "Unauthorized. Token verification failed." });
  }
};

export default authMiddleware;
