import express from "express";
import {
  getAllClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub,
} from "../controller/clubs.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { requireTenant } from "../middleware/tenant.middleware.js";
import { UserRole } from "../constants/roles.js";

const router = express.Router();

// Optional auth for discovery (to attach membership status if logged in)
router.get("/", (req, res, next) => {
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
}, getAllClubs);

router.get("/:id", (req, res, next) => {
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
}, getClubById);

// Protected mutation routes
router.post(
  "/",
  protect,
  authorize(UserRole.CLUB_PRESIDENT, UserRole.COLLEGE_ADMIN, UserRole.PLATFORM_ADMIN),
  requireTenant,
  createClub
);

router.put(
  "/:id",
  protect,
  authorize(UserRole.CLUB_PRESIDENT, UserRole.COLLEGE_ADMIN, UserRole.PLATFORM_ADMIN),
  requireTenant,
  updateClub
);

router.delete(
  "/:id",
  protect,
  authorize(UserRole.CLUB_PRESIDENT, UserRole.COLLEGE_ADMIN, UserRole.PLATFORM_ADMIN),
  requireTenant,
  deleteClub
);

export default router;
