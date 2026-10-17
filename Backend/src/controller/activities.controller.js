import Activity from "../models/Activity.js";
import Club from "../models/Club.js";
import Approval from "../models/Approval.js";
import Notification from "../models/Notification.js";
import AuditLog from "../models/AuditLog.js";
import { UserRole } from "../constants/roles.js";
import { verifyTenantAccess } from "../middleware/tenant.middleware.js";

export const getActivities = async (req, res) => {
  try {
    const { status, clubId } = req.query;
    const filter = {};

    if (req.collegeId) {
      filter.college = req.collegeId;
    }

    const isCollegeAdmin = req.user && (req.user.role === UserRole.COLLEGE_ADMIN || req.user.role === UserRole.PLATFORM_ADMIN);
    if (!isCollegeAdmin) {
      filter.status = "Approved";
    } else if (status && status !== "all") {
      filter.status = status;
    }

    if (clubId) {
      filter.club = clubId;
    }

    const activities = await Activity.find(filter)
      .populate("club", "name category logo")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch activities." });
  }
};

export const createActivity = async (req, res) => {
  try {
    const { title, description, clubId, date, location, activityType } = req.body;

    if (!title || !date) {
      return res.status(400).json({ success: false, message: "Title and date are required." });
    }

    let targetClub = null;
    if (clubId) {
      targetClub = await Club.findById(clubId);
    } else {
      targetClub = await Club.findOne({ president: req.user._id, college: req.collegeId });
    }

    if (!targetClub) {
      return res.status(404).json({ success: false, message: "Club not found." });
    }

    if (!verifyTenantAccess(targetClub.college, req)) {
      return res.status(403).json({ success: false, message: "Forbidden: Cross-tenant action denied." });
    }

    const newActivity = await Activity.create({
      college: targetClub.college,
      club: targetClub._id,
      title: title.trim(),
      description: description ? description.trim() : "",
      date,
      location: location || "Club Workshop",
      activityType: activityType || "Workshop",
      status: "Pending",
      createdBy: req.user._id,
    });

    await Approval.create({
      college: targetClub.college,
      requestedBy: req.user._id,
      actionType: "ACTIVITY_CREATE",
      resourceType: "Activity",
      resourceId: newActivity._id,
      status: "Pending",
      metadata: {
        title: newActivity.title,
        clubName: targetClub.name,
        date: newActivity.date,
      },
    });

    const collegeAdmins = await User.find({
      college: targetClub.college,
      role: UserRole.COLLEGE_ADMIN,
    });

    for (const admin of collegeAdmins) {
      await Notification.create({
        recipient: admin._id,
        college: targetClub.college,
        title: "New Activity Submitted",
        message: `${req.user.name} submitted activity "${newActivity.title}" for approval.`,
        type: "approval",
        relatedResource: {
          resourceType: "Activity",
          resourceId: newActivity._id,
        },
      });
    }

    await AuditLog.create({
      actorId: req.user._id,
      actorName: req.user.name,
      actorEmail: req.user.email,
      actorRole: req.user.role,
      college: targetClub.college,
      action: "ACTIVITY_CREATED",
      title: "Activity Proposed",
      description: `${req.user.name} proposed activity "${newActivity.title}". Awaiting College Admin approval.`,
      resourceType: "Activity",
      resourceId: newActivity._id,
      type: "activity",
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Activity submitted for College Admin approval.",
      activity: newActivity,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Failed to create activity." });
  }
};
