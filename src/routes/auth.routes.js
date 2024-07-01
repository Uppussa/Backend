import { Router } from "express";
import { register, login, dashboard, updateProfile } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/dashboard", verifyToken, dashboard);
router.post("/updateProfile", verifyToken, upload.single('profileImage'), updateProfile);

export default router;
