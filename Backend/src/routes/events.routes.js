import express from "express";
import {
  getEvents,
  createEvent,
  updateEvent,
} from "../controller/events.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { requireTenant } from "../middleware/tenant.middleware.js";
import { UserRole } from "../constants/roles.js";

const router = express.Router();

// Optional auth for reading events
router.get("/", (req, res, next) => {
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
}, getEvents);

router.post(
  "/",
  protect,
  authorize(UserRole.CLUB_PRESIDENT, UserRole.COLLEGE_ADMIN, UserRole.PLATFORM_ADMIN),
  requireTenant,
  createEvent
);

router.put(
  "/:id",
  protect,
  authorize(UserRole.CLUB_PRESIDENT, UserRole.COLLEGE_ADMIN, UserRole.PLATFORM_ADMIN),
  requireTenant,
  updateEvent
);

export default router;
