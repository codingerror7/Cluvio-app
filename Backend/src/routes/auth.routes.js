import express from "express";
import {
  register,
  login,
  presidentLogin,
  getMe,
  getColleges,
} from "../controller/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/president/login", presidentLogin);
router.get("/me", protect, getMe);
router.get("/colleges", getColleges);

export default router;
