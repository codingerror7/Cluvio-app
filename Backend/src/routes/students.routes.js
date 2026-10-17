import express from "express";
import {
  getStudentProfile,
  updateStudentProfile,
  getMyClubs,
  getMyEvents,
} from "../controller/students.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireTenant } from "../middleware/tenant.middleware.js";

const router = express.Router();

router.use(protect);
router.use(requireTenant);

router.get("/profile", getStudentProfile);
router.put("/profile", updateStudentProfile);
router.get("/my-clubs", getMyClubs);
router.get("/my-events", getMyEvents);

export default router;
