import express from "express";
const router = express.Router();
import { registerUser, loginUser } from "../controllers/authController.js";

// Jab frontend se /api/auth/register pe POST request aaye,
// toh 'registerUser' function chalao
router.post("/register", registerUser);

// Jab frontend se /api/auth/login pe POST request aaye,
// toh 'loginUser' function chalao
router.post("/login", loginUser);

export default router;
