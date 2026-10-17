import express from "express";
import {
  getCollegeDashboard,
  getStudents,
  getPresidents,
  generatePresidentCode,
  getPresidentCodes,
  revokePresidentCode,
  getCollegeAuditLogs,
} from "../controller/collegeAdmin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { requireTenant } from "../middleware/tenant.middleware.js";
import { UserRole } from "../constants/roles.js";

const router = express.Router();

router.use(protect);
router.use(authorize(UserRole.COLLEGE_ADMIN, UserRole.PLATFORM_ADMIN));
router.use(requireTenant);

router.get("/dashboard", getCollegeDashboard);
router.get("/students", getStudents);
router.get("/presidents", getPresidents);
router.post("/presidents/generate-code", generatePresidentCode);
router.get("/presidents/codes", getPresidentCodes);
router.patch("/presidents/codes/:id/revoke", revokePresidentCode);
router.get("/audit-logs", getCollegeAuditLogs);

export default router;
