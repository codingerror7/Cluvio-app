import express from "express";
import {
  submitRequest,
  getMyRequests,
  cancelRequest,
  getClubRequests,
  reviewRequest,
} from "../controller/requests.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { UserRole } from "../constants/roles.js";

const router = express.Router();

router.post("/", protect, authorize(UserRole.STUDENT), submitRequest);
router.get("/my", protect, authorize(UserRole.STUDENT), getMyRequests);
router.delete("/:id", protect, authorize(UserRole.STUDENT), cancelRequest);
router.get("/club/:clubId", protect, authorize(UserRole.CLUB_PRESIDENT), getClubRequests);
router.put("/:id/review", protect, authorize(UserRole.CLUB_PRESIDENT), reviewRequest);

export default router;
