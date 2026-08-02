import { Router } from "express";
import {
    register,
    login,
    role,
    deleteUser,
    logout,
} from "../controllers/auth.controller";
import { isAuthenticated } from "../middleware/auth.middleware";
import { rateLimit } from "express-rate-limit";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: "Too many requests from this IP, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // Limit each IP to 10 login attempts
  message: { error: "Too many login attempts, please try again later." },
});

// 📝 Public routes
router.post("/register",authLimiter, register);
router.post("/login", loginLimiter, login);

//protected routes
router.patch("/role", isAuthenticated, role);
router.delete("/", isAuthenticated, deleteUser);
router.post("/logout", isAuthenticated, logout)

export default router;
