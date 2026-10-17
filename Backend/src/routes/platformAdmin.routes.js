import express from "express";
import {
  getPlatformStats,
  getCollegesList,
  createCollegeTenant,
  getActivityFeed,
  getPlatformUsers,
} from "../controller/platformAdmin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { UserRole } from "../constants/roles.js";

const router = express.Router();

router.use(protect);
router.use(authorize(UserRole.PLATFORM_ADMIN));

router.get("/dashboard", getPlatformStats);
router.get("/colleges", getCollegesList);
router.post("/colleges", createCollegeTenant);
router.get("/activity-feed", getActivityFeed);
router.get("/users", getPlatformUsers);

export default router;
