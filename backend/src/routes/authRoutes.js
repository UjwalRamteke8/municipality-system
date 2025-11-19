// /api/auth/* endpoints
import express from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Get logged in user profile
router.get("/me", authMiddleware, getProfile);

export default router;
