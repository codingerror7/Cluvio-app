import express from "express";
import {
  getPresidentProfile,
  updatePresidentProfile,
  getMyClub,
  getClubMembers,
  getClubAnalytics,
} from "../controller/presidents.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { requireTenant } from "../middleware/tenant.middleware.js";
import { UserRole } from "../constants/roles.js";

const router = express.Router();

router.use(protect);
router.use(authorize(UserRole.CLUB_PRESIDENT, UserRole.COLLEGE_ADMIN, UserRole.PLATFORM_ADMIN));
router.use(requireTenant);

router.get("/profile", getPresidentProfile);
router.put("/profile", updatePresidentProfile);
router.get("/my-club", getMyClub);
router.get("/members", getClubMembers);
router.get("/analytics", getClubAnalytics);

export default router;
