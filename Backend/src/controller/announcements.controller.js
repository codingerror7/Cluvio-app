import Announcement from "../models/Announcement.js";
import Club from "../models/Club.js";
import Approval from "../models/Approval.js";
import Notification from "../models/Notification.js";
import AuditLog from "../models/AuditLog.js";
import { UserRole } from "../constants/roles.js";
import { verifyTenantAccess } from "../middleware/tenant.middleware.js";

export const getAnnouncements = async (req, res) => {
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

    const announcements = await Announcement.find(filter)
      .populate("club", "name category logo")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: announcements.length,
      announcements,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch announcements." });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, priority, clubId } = req.body;

    if (!title || !message) {
      return res.status(400).json({ success: false, message: "Title and message are required." });
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

    const newAnnouncement = await Announcement.create({
      college: targetClub.college,
      club: targetClub._id,
      title: title.trim(),
      message: message.trim(),
      priority: priority || "Normal",
      status: "Pending",
      createdBy: req.user._id,
    });

    await Approval.create({
      college: targetClub.college,
      requestedBy: req.user._id,
      actionType: "ANNOUNCEMENT_CREATE",
      resourceType: "Announcement",
      resourceId: newAnnouncement._id,
      status: "Pending",
      metadata: {
        title: newAnnouncement.title,
        clubName: targetClub.name,
        message: newAnnouncement.message,
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
        title: "New Announcement for Review",
        message: `${req.user.name} submitted an announcement "${newAnnouncement.title}" (${targetClub.name}) for approval.`,
        type: "approval",
        relatedResource: {
          resourceType: "Announcement",
          resourceId: newAnnouncement._id,
        },
      });
    }

    await AuditLog.create({
      actorId: req.user._id,
      actorName: req.user.name,
      actorEmail: req.user.email,
      actorRole: req.user.role,
      college: targetClub.college,
      action: "ANNOUNCEMENT_CREATED",
      title: "Announcement Created",
      description: `${req.user.name} created announcement "${newAnnouncement.title}". Pending College Admin review.`,
      resourceType: "Announcement",
      resourceId: newAnnouncement._id,
      type: "announcement",
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Announcement submitted for College Admin approval.",
      announcement: newAnnouncement,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Failed to create announcement." });
  }
};
