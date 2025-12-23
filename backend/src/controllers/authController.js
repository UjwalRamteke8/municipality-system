// Authentication (signup, login, roles)
// backend/src/controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

/**
 * Create JWT token
 */
const createToken = (userId, role = null, department = null) => {
  const payload = { id: userId };
  if (role) payload.role = role;
  if (department) payload.department = department;

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

/**
 * @route POST /api/auth/register
 * @desc Register new user
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, address, password, role = "citizen" } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password required." });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing)
    return res.status(409).json({ message: "Email already in use." });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    phone,
    address,
    password: hashed,
    role,
  });

  const token = createToken(user._id);

  res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

/**
 * @route POST /api/auth/login
 * @desc Login user (citizen)
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required." });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: "Invalid credentials." });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid credentials." });

  const token = createToken(user._id);

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

/**
 * @route POST /api/auth/staff-login
 * @desc Login staff/admin user with department
 */
export const departmentLogin = asyncHandler(async (req, res) => {
  const { email, password, department } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required." });
  }

  // 1. Find User
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ message: "Official account not found." });
  }

  // 2. Strict Role Check (Security Layer)
  if (user.role !== "admin" && user.role !== "staff") {
    return res
      .status(403)
      .json({ message: "Access Restricted: Use Citizen Login Portal." });
  }

  // 3. Verify Password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // 4. Generate Token with Role and Department
  const token = createToken(user._id, user.role, department);

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: department,
    },
    token,
  });
});

/**
 * @route GET /api/auth/me
 * @desc Get logged-in user profile
 * Assumes authentication middleware sets req.userId
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) return res.status(404).json({ message: "User not found." });
  res.json({ user });
});
