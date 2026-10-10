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
} from "../controller/clubs.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// Optional auth middleware so public can view clubs, but logged-in user gets their membership status
const optionalProtect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const secret = process.env.JWT_SECRET || "cluvio_jwt_secret_college_demo_key_2026";
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
router.post("/", protect, authorize("president", "admin"), createClub);
router.put("/:id", protect, authorize("president", "admin"), updateClub);
router.delete("/:id", protect, authorize("president", "admin"), deleteClub);
router.get("/:id/members", protect, getClubMembers);
router.delete(
  "/:id/members/:studentId",
  protect,
  authorize("president", "admin"),
  removeMember
);

export default router;
