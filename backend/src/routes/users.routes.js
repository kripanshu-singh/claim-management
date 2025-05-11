import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  refreshAccessToken,
  getHealth,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route GET /api/users/health
 * @desc Get Health
 */
router.get("/health", getHealth);

/**
 * @route POST /api/users/register
 * @desc Register a new user
 */
router.post("/register", registerUser);

/**
 * @route POST /api/users/login
 * @desc Login a user
 */
router.post("/login", loginUser);

/**
 * @route POST /api/users/logout
 * @desc Logout a user
 */
router.post("/logout", protect, logoutUser);

/**
 * @route GET /api/users/profile
 * @desc Get user profile
 * @access Private
 */
router.get("/profile", protect, getUserProfile);

/**
 * @route POST /api/users/refresh
 * @desc Refresh access token
 */
router.post("/refresh", refreshAccessToken);

export default router;
