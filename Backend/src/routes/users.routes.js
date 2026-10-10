import express from "express";
import { getProfile, updateProfile } from "../controller/users.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
