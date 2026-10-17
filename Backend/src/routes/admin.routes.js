import express from "express";
import {
  getPlatformStats,
  getActivityFeed,
  getPlatformUsers,
} from "../controller/platformAdmin.controller.js";
import {
  getCollegeDashboard,
  getStudents,
  getPresidents,
  generatePresidentCode,
  getPresidentCodes,
  revokePresidentCode,
} from "../controller/collegeAdmin.controller.js";
import { getApprovals, approveRequest, rejectRequest } from "../controller/approvals.controller.js";
import { getAllClubs } from "../controller/clubs.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { requireTenant } from "../middleware/tenant.middleware.js";
import { UserRole } from "../constants/roles.js";

const router = express.Router();

router.use(protect);
router.use(authorize(UserRole.COLLEGE_ADMIN, UserRole.PLATFORM_ADMIN));

// Dynamic dashboard: serves platform stats if platform_admin, else college stats
router.get("/dashboard", (req, res, next) => {
  if (req.user.role === UserRole.PLATFORM_ADMIN) {
    return getPlatformStats(req, res, next);
  }
  return requireTenant(req, res, () => getCollegeDashboard(req, res, next));
});

// Students list
router.get("/students", (req, res, next) => {
  if (req.user.role === UserRole.PLATFORM_ADMIN) {
    req.query.role = UserRole.STUDENT;
    return getPlatformUsers(req, res, next);
  }
  return requireTenant(req, res, () => getStudents(req, res, next));
});

// Presidents list
router.get("/presidents", (req, res, next) => {
  if (req.user.role === UserRole.PLATFORM_ADMIN) {
    req.query.role = UserRole.CLUB_PRESIDENT;
    return getPlatformUsers(req, res, next);
  }
  return requireTenant(req, res, () => getPresidents(req, res, next));
});

// President code generation & retrieval
router.post("/presidents/generate-code", requireTenant, generatePresidentCode);
router.get("/presidents/codes", requireTenant, getPresidentCodes);
router.patch("/presidents/codes/:id/revoke", requireTenant, revokePresidentCode);

// Clubs list
router.get("/clubs", getAllClubs);

// Requests / Approvals
router.get("/requests", requireTenant, getApprovals);
router.post("/requests/:id/approve", requireTenant, approveRequest);
router.post("/requests/:id/reject", requireTenant, rejectRequest);

export default router;
