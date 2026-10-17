import Membership from "../models/Membership.js";
import Club from "../models/Club.js";
import Approval from "../models/Approval.js";
import Notification from "../models/Notification.js";
import AuditLog from "../models/AuditLog.js";
import { UserRole } from "../constants/roles.js";
import { verifyTenantAccess } from "../middleware/tenant.middleware.js";

export const requestJoinClub = async (req, res) => {
  try {
    const { clubId, motivation, role = "General Member" } = req.body;

    if (!clubId) {
      return res.status(400).json({ success: false, message: "Club ID is required." });
    }

    const club = await Club.findById(clubId).populate("president", "name email");
    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found." });
    }

    // Tenant check
    if (!verifyTenantAccess(club.college, req)) {
      return res.status(403).json({ success: false, message: "Forbidden: You cannot join a club from another college." });
    }

    if (club.status !== "Active") {
      return res.status(400).json({ success: false, message: "Cannot join an unapproved or inactive club." });
    }

    // Check existing membership
    const existingMembership = await Membership.findOne({
      club: club._id,
      student: req.user._id,
    });

    if (existingMembership) {
      if (existingMembership.status === "Active") {
        return res.status(409).json({ success: false, message: "You are already an active member of this club." });
      }
      if (existingMembership.status === "Pending") {
        return res.status(409).json({ success: false, message: "Your membership application is already pending College Admin approval." });
      }
      // If previously rejected/cancelled, allow resubmission
      existingMembership.status = "Pending";
      existingMembership.motivation = motivation || "";
      existingMembership.requestedAt = new Date();
      existingMembership.rejectionReason = "";
      await existingMembership.save();

      // Create new approval
      await Approval.create({
        college: club.college,
        requestedBy: req.user._id,
        actionType: "MEMBERSHIP_REQUEST",
        resourceType: "Membership",
        resourceId: existingMembership._id,
        status: "Pending",
        metadata: {
          clubName: club.name,
          studentName: req.user.name,
          enrollmentNumber: req.user.enrollmentNumber,
          motivation: motivation || "",
        },
      });

      return res.status(200).json({
        success: true,
        message: "Membership request resubmitted and pending College Admin approval.",
        membership: existingMembership,
      });
    }

    // Create new Pending membership
    const newMembership = await Membership.create({
      college: club.college,
      student: req.user._id,
      club: club._id,
      role,
      motivation: motivation || "",
      status: "Pending",
      requestedAt: new Date(),
    });

    // Create approval item
    await Approval.create({
      college: club.college,
      requestedBy: req.user._id,
      actionType: "MEMBERSHIP_REQUEST",
      resourceType: "Membership",
      resourceId: newMembership._id,
      status: "Pending",
      metadata: {
        clubName: club.name,
        studentName: req.user.name,
        enrollmentNumber: req.user.enrollmentNumber,
        motivation: motivation || "",
      },
    });

    // Notify College Admin(s)
    const collegeAdmins = await User.find({
      college: club.college,
      role: UserRole.COLLEGE_ADMIN,
    });

    for (const admin of collegeAdmins) {
      await Notification.create({
        recipient: admin._id,
        college: club.college,
        title: "New Club Membership Request",
        message: `${req.user.name} (${req.user.enrollmentNumber || req.user.email}) requested to join "${club.name}".`,
        type: "approval",
        relatedResource: {
          resourceType: "Membership",
          resourceId: newMembership._id,
        },
      });
    }

    // Audit Log
    await AuditLog.create({
      actorId: req.user._id,
      actorName: req.user.name,
      actorEmail: req.user.email,
      actorRole: req.user.role,
      college: club.college,
      action: "MEMBERSHIP_REQUESTED",
      title: "Club Membership Requested",
      description: `${req.user.name} requested to join "${club.name}". Pending College Admin approval.`,
      resourceType: "Membership",
      resourceId: newMembership._id,
      type: "membership",
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Club membership request submitted for College Admin review.",
      membership: newMembership,
    });
  } catch (error) {
    console.error("Join request error:", error);
    return res.status(500).json({ success: false, message: error.message || "Failed to submit membership request." });
  }
};

export const getMyMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find({ student: req.user._id })
      .populate("club", "name category logo description sector")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      memberships,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch memberships." });
  }
};

export const cancelMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const membership = await Membership.findById(id).populate("club");

    if (!membership) {
      return res.status(404).json({ success: false, message: "Membership not found." });
    }

    if (membership.student.toString() !== req.user._id.toString() && req.user.role !== UserRole.COLLEGE_ADMIN) {
      return res.status(403).json({ success: false, message: "Forbidden: You cannot cancel another student's membership." });
    }

    const wasActive = membership.status === "Active";
    membership.status = "Cancelled";
    await membership.save();

    if (wasActive && membership.club) {
      await Club.findByIdAndUpdate(membership.club._id, { $inc: { membersCount: -1 } });
    }

    // Cancel any pending approval records
    await Approval.updateMany(
      { resourceId: membership._id, status: "Pending" },
      { status: "Rejected", reason: "Cancelled by student" }
    );

    return res.status(200).json({
      success: true,
      message: "Membership cancelled successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to cancel membership." });
  }
};
