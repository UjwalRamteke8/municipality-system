import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import admin from "firebase-admin";
import User from "../models/User.js";

// Keep your existing createToken, register, and login functions...
// (I am only showing the fixed departmentLogin function below)

export const createToken = (userId, role = null, department = null) => {
  const payload = { id: userId };
  if (role) payload.role = role;
  if (department) payload.department = department;

  return jwt.sign(payload, process.env.JWT_SECRET, {
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

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    // 1. Verify Firebase Token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const email = decodedToken.email;

    // 2. Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Staff record not found in system." });
    }

    // 3. Verify Role (Allow both admin and staff)
    if (user.role !== "admin" && user.role !== "staff") {
      return res
        .status(403)
        .json({ message: "Access denied. Not authorized as staff." });
    }

    // 4. Verify Department (Skip check if department is 'general' or user is 'admin')
    if (department !== "general" && user.department !== department) {
      return res
        .status(403)
        .json({ message: `Access denied for ${department} department.` });
    }

    res.status(200).json({
      message: "Staff verification successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    console.error("Firebase Auth Error:", error);
    res.status(401).json({ message: "Invalid authentication token" });
  }
});
