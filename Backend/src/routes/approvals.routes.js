import express from "express";
import {
  getApprovals,
  getApprovalCounts,
  approveRequest,
  rejectRequest,
} from "../controller/approvals.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { requireTenant } from "../middleware/tenant.middleware.js";
import { UserRole } from "../constants/roles.js";

const router = express.Router();

router.use(protect);
router.use(authorize(UserRole.COLLEGE_ADMIN, UserRole.PLATFORM_ADMIN));
router.use(requireTenant);

router.get("/", getApprovals);
router.get("/counts", getApprovalCounts);
router.post("/:id/approve", approveRequest);
router.post("/:id/reject", rejectRequest);

export default router;
