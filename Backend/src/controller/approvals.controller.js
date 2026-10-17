import Approval from "../models/Approval.js";
import User from "../models/User.js";
import Club from "../models/Club.js";
import Membership from "../models/Membership.js";
import Event from "../models/Event.js";
import Activity from "../models/Activity.js";
import Announcement from "../models/Announcement.js";
import Notification from "../models/Notification.js";
import AuditLog from "../models/AuditLog.js";
import { verifyTenantAccess } from "../middleware/tenant.middleware.js";

/**
 * Get all approvals scoped to the College Admin's college
 */
export const getApprovals = async (req, res) => {
  try {
    const { status, actionType, resourceType, page = 1, limit = 50 } = req.query;
    const filter = { college: req.collegeId };

    if (status && status !== "all") {
      filter.status = status;
    }
    if (actionType && actionType !== "all") {
      filter.actionType = actionType;
    }
    if (resourceType && resourceType !== "all") {
      filter.resourceType = resourceType;
    }

    const approvals = await Approval.find(filter)
      .populate("requestedBy", "name email enrollmentNumber studentId avatar department year role")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Approval.countDocuments(filter);
    const pendingCount = await Approval.countDocuments({ college: req.collegeId, status: "Pending" });

    return res.status(200).json({
      success: true,
      total,
      pendingCount,
      approvals,
    });
  } catch (error) {
    console.error("Get approvals error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch approvals.",
    });
  }
};

/**
 * Get pending approval counts by category
 */
export const getApprovalCounts = async (req, res) => {
  try {
    const collegeId = req.collegeId;
    const [profiles, clubs, memberships, events, activities, announcements] = await Promise.all([
      Approval.countDocuments({ college: collegeId, status: "Pending", resourceType: "User" }),
      Approval.countDocuments({ college: collegeId, status: "Pending", resourceType: "Club" }),
      Approval.countDocuments({ college: collegeId, status: "Pending", resourceType: "Membership" }),
      Approval.countDocuments({ college: collegeId, status: "Pending", resourceType: "Event" }),
      Approval.countDocuments({ college: collegeId, status: "Pending", resourceType: "Activity" }),
      Approval.countDocuments({ college: collegeId, status: "Pending", resourceType: "Announcement" }),
    ]);

    const totalPending = profiles + clubs + memberships + events + activities + announcements;

    return res.status(200).json({
      success: true,
      counts: {
        totalPending,
        profiles,
        clubs,
        memberships,
        events,
        activities,
        announcements,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load approval counts.",
    });
  }
};

/**
 * Approve a pending request transactionally
 */
export const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const approval = await Approval.findById(id).populate("requestedBy");

    if (!approval) {
      return res.status(404).json({ success: false, message: "Approval request not found." });
    }

    if (!verifyTenantAccess(approval.college, req)) {
      return res.status(403).json({ success: false, message: "Forbidden: Cross-tenant approval denied." });
    }

    if (approval.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: `Request is already ${approval.status}.`,
      });
    }

    // Apply resource changes based on actionType
    let targetName = "";

    switch (approval.actionType) {
      case "PROFILE_CREATE":
      case "PROFILE_UPDATE": {
        const user = await User.findById(approval.resourceId);
        if (user) {
          user.profileStatus = "Approved";
          user.profileRejectionReason = "";
          await user.save();
          targetName = user.name;
        }
        break;
      }

      case "CLUB_CREATE": {
        const club = await Club.findById(approval.resourceId);
        if (club) {
          club.status = "Active";
          club.approvedAt = new Date();
          club.approvedBy = req.user._id;
          club.rejectionReason = "";
          await club.save();
          targetName = club.name;
        }
        break;
      }

      case "CLUB_UPDATE": {
        const club = await Club.findById(approval.resourceId);
        if (club && club.pendingChanges) {
          Object.assign(club, club.pendingChanges);
          club.pendingChanges = null;
          club.rejectionReason = "";
          await club.save();
          targetName = club.name;
        }
        break;
      }

      case "CLUB_DELETE": {
        const club = await Club.findById(approval.resourceId);
        if (club) {
          club.status = "Archived";
          club.deletedAt = new Date();
          club.deletedBy = req.user._id;
          await club.save();
          targetName = club.name;
        }
        break;
      }

      case "MEMBERSHIP_REQUEST": {
        const membership = await Membership.findById(approval.resourceId).populate("club");
        if (membership) {
          membership.status = "Active";
          membership.approvedAt = new Date();
          membership.approvedBy = req.user._id;
          membership.rejectionReason = "";
          await membership.save();

          // Increment club members count
          if (membership.club) {
            await Club.findByIdAndUpdate(membership.club._id, { $inc: { membersCount: 1 } });
            targetName = membership.club.name;
          }
        }
        break;
      }

      case "EVENT_CREATE":
      case "EVENT_UPDATE": {
        const event = await Event.findById(approval.resourceId);
        if (event) {
          event.status = "Approved";
          event.rejectionReason = "";
          await event.save();
          targetName = event.title;
        }
        break;
      }

      case "ACTIVITY_CREATE":
      case "ACTIVITY_UPDATE": {
        const activity = await Activity.findById(approval.resourceId);
        if (activity) {
          activity.status = "Approved";
          activity.rejectionReason = "";
          await activity.save();
          targetName = activity.title;
        }
        break;
      }

      case "ANNOUNCEMENT_CREATE":
      case "ANNOUNCEMENT_UPDATE": {
        const announcement = await Announcement.findById(approval.resourceId).populate("club");
        if (announcement) {
          announcement.status = "Approved";
          announcement.rejectionReason = "";
          await announcement.save();
          targetName = announcement.title;

          // Notify all joined students in this club
          const clubMembers = await Membership.find({
            club: announcement.club._id,
            status: "Active",
          });

          for (const member of clubMembers) {
            await Notification.create({
              recipient: member.student,
              college: approval.college,
              title: `New Announcement from ${announcement.club.name}`,
              message: `${announcement.title}: ${announcement.message}`,
              type: "announcement",
              relatedResource: {
                resourceType: "Announcement",
                resourceId: announcement._id,
              },
            });
          }
        }
        break;
      }

      default:
        break;
    }

    // Mark approval record as Approved
    approval.status = "Approved";
    approval.reviewedBy = req.user._id;
    approval.reviewedAt = new Date();
    await approval.save();

    // Create Notification for the requester
    if (approval.requestedBy) {
      await Notification.create({
        recipient: approval.requestedBy._id,
        college: approval.college,
        title: "Request Approved",
        message: `Your ${approval.actionType.replace("_", " ").toLowerCase()} request ${targetName ? `("${targetName}") ` : ""}has been approved by the College Admin.`,
        type: "approval",
        relatedResource: {
          resourceType: approval.resourceType,
          resourceId: approval.resourceId,
        },
      });
    }

    // Audit Log
    await AuditLog.create({
      actorId: req.user._id,
      actorName: req.user.name,
      actorEmail: req.user.email,
      actorRole: req.user.role,
      college: approval.college,
      action: `${approval.actionType}_APPROVED`,
      title: "Request Approved",
      description: `College Admin approved ${approval.actionType} for ${approval.resourceType} (${targetName || approval.resourceId}).`,
      resourceType: approval.resourceType,
      resourceId: approval.resourceId,
      type: "approval",
      status: "Success",
    });

    return res.status(200).json({
      success: true,
      message: "Request approved successfully.",
      approval,
    });
  } catch (error) {
    console.error("Approve error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to approve request.",
    });
  }
};

/**
 * Reject a pending request with a required rejection reason
 */
export const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason || !reason.trim()) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required.",
      });
    }

    const approval = await Approval.findById(id).populate("requestedBy");
    if (!approval) {
      return res.status(404).json({ success: false, message: "Approval request not found." });
    }

    if (!verifyTenantAccess(approval.college, req)) {
      return res.status(403).json({ success: false, message: "Forbidden: Cross-tenant rejection denied." });
    }

    if (approval.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: `Request is already ${approval.status}.`,
      });
    }

    const trimmedReason = reason.trim();
    let targetName = "";

    // Apply rejection to underlying resource
    switch (approval.actionType) {
      case "PROFILE_CREATE":
      case "PROFILE_UPDATE": {
        const user = await User.findById(approval.resourceId);
        if (user) {
          user.profileStatus = "Rejected";
          user.profileRejectionReason = trimmedReason;
          await user.save();
          targetName = user.name;
        }
        break;
      }

      case "CLUB_CREATE": {
        const club = await Club.findById(approval.resourceId);
        if (club) {
          club.status = "Rejected";
          club.rejectionReason = trimmedReason;
          await club.save();
          targetName = club.name;
        }
        break;
      }

      case "CLUB_UPDATE": {
        const club = await Club.findById(approval.resourceId);
        if (club) {
          club.pendingChanges = null;
          club.rejectionReason = trimmedReason;
          await club.save();
          targetName = club.name;
        }
        break;
      }

      case "MEMBERSHIP_REQUEST": {
        const membership = await Membership.findById(approval.resourceId).populate("club");
        if (membership) {
          membership.status = "Rejected";
          membership.rejectionReason = trimmedReason;
          await membership.save();
          if (membership.club) {
            targetName = membership.club.name;
          }
        }
        break;
      }

      case "EVENT_CREATE":
      case "EVENT_UPDATE": {
        const event = await Event.findById(approval.resourceId);
        if (event) {
          event.status = "Rejected";
          event.rejectionReason = trimmedReason;
          await event.save();
          targetName = event.title;
        }
        break;
      }

      case "ACTIVITY_CREATE":
      case "ACTIVITY_UPDATE": {
        const activity = await Activity.findById(approval.resourceId);
        if (activity) {
          activity.status = "Rejected";
          activity.rejectionReason = trimmedReason;
          await activity.save();
          targetName = activity.title;
        }
        break;
      }

      case "ANNOUNCEMENT_CREATE":
      case "ANNOUNCEMENT_UPDATE": {
        const announcement = await Announcement.findById(approval.resourceId);
        if (announcement) {
          announcement.status = "Rejected";
          announcement.rejectionReason = trimmedReason;
          await announcement.save();
          targetName = announcement.title;
        }
        break;
      }

      default:
        break;
    }

    // Update approval record
    approval.status = "Rejected";
    approval.reason = trimmedReason;
    approval.reviewedBy = req.user._id;
    approval.reviewedAt = new Date();
    await approval.save();

    // Notify requester with rejection reason
    if (approval.requestedBy) {
      await Notification.create({
        recipient: approval.requestedBy._id,
        college: approval.college,
        title: "Request Rejected",
        message: `Your ${approval.actionType.replace("_", " ").toLowerCase()} request ${targetName ? `("${targetName}") ` : ""}was rejected. Reason: "${trimmedReason}". You may correct the details and resubmit.`,
        type: "rejection",
        relatedResource: {
          resourceType: approval.resourceType,
          resourceId: approval.resourceId,
        },
      });
    }

    // Audit Log
    await AuditLog.create({
      actorId: req.user._id,
      actorName: req.user.name,
      actorEmail: req.user.email,
      actorRole: req.user.role,
      college: approval.college,
      action: `${approval.actionType}_REJECTED`,
      title: "Request Rejected",
      description: `College Admin rejected ${approval.actionType} for ${approval.resourceType} (${targetName || approval.resourceId}). Reason: ${trimmedReason}`,
      resourceType: approval.resourceType,
      resourceId: approval.resourceId,
      type: "approval",
      status: "Rejected",
      metadata: { reason: trimmedReason },
    });

    return res.status(200).json({
      success: true,
      message: "Request rejected successfully.",
      approval,
    });
  } catch (error) {
    console.error("Reject error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to reject request.",
    });
  }
};
