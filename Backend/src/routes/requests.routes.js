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

const router = express.Router();

router.post("/", protect, authorize("student"), submitRequest);
router.get("/my", protect, authorize("student"), getMyRequests);
router.delete("/:id", protect, authorize("student"), cancelRequest);
router.get("/club/:clubId", protect, authorize("president", "admin"), getClubRequests);
router.put("/:id/review", protect, authorize("president", "admin"), reviewRequest);

export default router;
