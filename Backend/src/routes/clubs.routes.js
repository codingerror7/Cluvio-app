import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  getAllClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub,
  getClubMembers,
  removeMember,
  addEvent,
  removeEvent,
  addAnnouncement,
  removeAnnouncement,
  updateRecruitmentSettings,
} from "../controller/clubs.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { UserRole } from "../constants/roles.js";

const router = express.Router();

// Optional auth middleware so public can view clubs, but logged-in user gets their membership status
const optionalProtect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const secret =
        process.env.JWT_SECRET || "cluvio_jwt_secret_college_demo_key_2026";
      const decoded = jwt.verify(token, secret);
      req.user = await User.findById(decoded.id).select("-password");
    } catch (e) {
      // ignore
    }
  }
  next();
};

router.get("/", optionalProtect, getAllClubs);
router.get("/:id", optionalProtect, getClubById);
router.post("/", protect, authorize(UserRole.CLUB_PRESIDENT), createClub);
router.put("/:id", protect, authorize(UserRole.CLUB_PRESIDENT), updateClub);
router.delete("/:id", protect, authorize(UserRole.CLUB_PRESIDENT), deleteClub);
router.get("/:id/members", protect, getClubMembers);
router.delete(
  "/:id/members/:studentId",
  protect,
  authorize(UserRole.CLUB_PRESIDENT),
  removeMember
);

// Activities & Events Management
router.post("/:id/events", protect, authorize(UserRole.CLUB_PRESIDENT), addEvent);
router.delete(
  "/:id/events/:eventId",
  protect,
  authorize(UserRole.CLUB_PRESIDENT),
  removeEvent
);

// Announcements Management
router.post(
  "/:id/announcements",
  protect,
  authorize(UserRole.CLUB_PRESIDENT),
  addAnnouncement
);
router.delete(
  "/:id/announcements/:announcementId",
  protect,
  authorize(UserRole.CLUB_PRESIDENT),
  removeAnnouncement
);

// Recruitment Settings Management
router.put(
  "/:id/recruitment",
  protect,
  authorize(UserRole.CLUB_PRESIDENT),
  updateRecruitmentSettings
);

export default router;
