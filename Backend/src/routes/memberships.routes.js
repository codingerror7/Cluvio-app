import express from "express";
import {
  requestJoinClub,
  getMyMemberships,
  cancelMembership,
} from "../controller/memberships.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireTenant } from "../middleware/tenant.middleware.js";

const router = express.Router();

router.use(protect);
router.use(requireTenant);

router.post("/join", requestJoinClub);
router.get("/my-memberships", getMyMemberships);
router.delete("/:id", cancelMembership);

export default router;
