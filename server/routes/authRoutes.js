import express from "express";
import { protect } from "../middleware/auth.js";
import { loginUser, getMe } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/me", protect, getMe); // protected route

export default router;
