import express from "express";
import {
  getDashboardStats,
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllPresidents,
  getPresidentById,
  createPresident,
  updatePresident,
  deletePresident,
  getAllRequests,
} from "../controller/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// All admin routes require admin role
router.use(protect, authorize("admin"));

router.get("/dashboard", getDashboardStats);

router.get("/students", getAllStudents);
router.post("/students", createStudent);
router.get("/students/:id", getStudentById);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

router.get("/presidents", getAllPresidents);
router.post("/presidents", createPresident);
router.get("/presidents/:id", getPresidentById);
router.put("/presidents/:id", updatePresident);
router.delete("/presidents/:id", deletePresident);

router.get("/requests", getAllRequests);

export default router;
