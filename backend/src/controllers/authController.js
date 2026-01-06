import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import admin from "firebase-admin";
import User from "../models/User.js";

// Keep your existing createToken, register, and login functions...
// (I am only showing the fixed departmentLogin function below)

export const createToken = (userId, role, department) => {
  return jwt.sign({ id: userId, role, department }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};
export const register = asyncHandler(async (req, res) => {
  // ... keep existing register code ...
  // (Ensure you copy the implementation from your existing file if not changing it)
  const { name, email, phone, address, password, role = "citizen" } = req.body;
  // ... rest of register ...
  // Placeholder to save space - keep your original register code here
});

export const login = asyncHandler(async (req, res) => {
  // ... keep existing login code ...
});

export const getProfile = asyncHandler(async (req, res) => {
  // ... keep existing getProfile code ...
});

// --- THE FIXED FUNCTION ---
export const departmentLogin = asyncHandler(async (req, res) => {
  const { department } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "Staff not found" });
    }

    if (!["admin", "staff"].includes(user.role)) {
      return res.status(403).json({ message: "Not staff" });
    }

    if (department !== "general" && user.department !== department) {
      return res.status(403).json({ message: "Department access denied" });
    }

    return res.status(200).json({
      message: "Staff verified",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (err) {
    console.error("Verify staff error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
});
