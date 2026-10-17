import express from "express";
import {
  getAnnouncements,
  createAnnouncement,
} from "../controller/announcements.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { requireTenant } from "../middleware/tenant.middleware.js";
import { UserRole } from "../constants/roles.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
}, getAnnouncements);

router.post(
  "/",
  protect,
  authorize(UserRole.CLUB_PRESIDENT, UserRole.COLLEGE_ADMIN, UserRole.PLATFORM_ADMIN),
  requireTenant,
  createAnnouncement
);

export default router;
