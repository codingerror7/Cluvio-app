import User from "../models/User.js";
import Club from "../models/Club.js";
import Membership from "../models/Membership.js";
import Event from "../models/Event.js";
import Activity from "../models/Activity.js";
import Announcement from "../models/Announcement.js";
import Approval from "../models/Approval.js";
import Notification from "../models/Notification.js";
import AuditLog from "../models/AuditLog.js";
import { UserRole } from "../constants/roles.js";

export const getPresidentProfile = async (req, res) => {
  try {
    const president = await User.findById(req.user._id).select("-password").populate("college");
    const club = await Club.findOne({ president: req.user._id, college: req.collegeId });

    return res.status(200).json({
      success: true,
      president,
      club,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch president profile." });
  }
};

export const updatePresidentProfile = async (req, res) => {
  try {
    const { name, department, phone, bio, avatar } = req.body;
    const president = await User.findById(req.user._id).populate("college");
    if (!president) {
      return res.status(404).json({ success: false, message: "President not found." });
    }

    if (name) president.name = name.trim();
    if (department) president.department = department.trim();
    if (phone !== undefined) president.phone = phone.trim();
    if (bio !== undefined) president.bio = bio.trim();
    if (avatar) president.avatar = avatar;

    president.profileStatus = "Pending";
    await president.save();

    // Create approval item
    await Approval.create({
      college: president.college._id,
      requestedBy: president._id,
      actionType: "PROFILE_UPDATE",
      resourceType: "User",
      resourceId: president._id,
      status: "Pending",
      metadata: {
        name: president.name,
        department: president.department,
        avatar: president.avatar,
        phone: president.phone,
        bio: president.bio,
      },
    });

    // Notify College Admin
    const collegeAdmins = await User.find({
      college: president.college._id,
      role: UserRole.COLLEGE_ADMIN,
    });

    for (const admin of collegeAdmins) {
      await Notification.create({
        recipient: admin._id,
        college: president.college._id,
        title: "President Profile Update",
        message: `Club President ${president.name} submitted profile updates for review.`,
        type: "approval",
        relatedResource: {
          resourceType: "User",
          resourceId: president._id,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "President profile updated and submitted for approval.",
      president,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update president profile." });
  }
};

export const getMyClub = async (req, res) => {
  try {
    const club = await Club.findOne({
      president: req.user._id,
      college: req.collegeId,
    }).populate("president", "name email avatar department year");

    return res.status(200).json({
      success: true,
      club: club || null,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch club." });
  }
};

export const getClubMembers = async (req, res) => {
  try {
    const club = await Club.findOne({ president: req.user._id, college: req.collegeId });
    if (!club) {
      return res.status(404).json({ success: false, message: "No club found for this president." });
    }

    const memberships = await Membership.find({ club: club._id })
      .populate("student", "name email enrollmentNumber studentId avatar department year course phone")
      .sort({ createdAt: -1 });

    const activeMembers = memberships.filter((m) => m.status === "Active");
    const pendingMembers = memberships.filter((m) => m.status === "Pending");

    return res.status(200).json({
      success: true,
      clubName: club.name,
      totalCount: memberships.length,
      activeMembers: activeMembers.map((m) => ({
        id: m._id,
        studentId: m.student?._id,
        name: m.student?.name || "Student",
        email: m.student?.email || "",
        enrollmentNumber: m.student?.enrollmentNumber || m.student?.studentId || "",
        avatar: m.student?.avatar || "/avatars/avatar-1.svg",
        department: m.student?.department || "Computer Science",
        year: m.student?.year || "1st Year",
        role: m.role,
        joinedDate: m.approvedAt || m.createdAt,
      })),
      pendingMembers: pendingMembers.map((m) => ({
        id: m._id,
        studentId: m.student?._id,
        name: m.student?.name || "Student",
        email: m.student?.email || "",
        enrollmentNumber: m.student?.enrollmentNumber || m.student?.studentId || "",
        avatar: m.student?.avatar || "/avatars/avatar-1.svg",
        department: m.student?.department || "Computer Science",
        year: m.student?.year || "1st Year",
        motivation: m.motivation,
        requestedDate: m.requestedAt || m.createdAt,
      })),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch club members." });
  }
};

export const getClubAnalytics = async (req, res) => {
  try {
    const club = await Club.findOne({ president: req.user._id, college: req.collegeId });
    if (!club) {
      return res.status(200).json({
        success: true,
        analytics: {
          totalMembers: 0,
          activeMembers: 0,
          pendingRequests: 0,
          eventsCount: 0,
          activitiesCount: 0,
          announcementsCount: 0,
          engagementRate: "85%",
        },
      });
    }

    const [
      activeMembersCount,
      pendingRequestsCount,
      eventsCount,
      activitiesCount,
      announcementsCount,
    ] = await Promise.all([
      Membership.countDocuments({ club: club._id, status: "Active" }),
      Membership.countDocuments({ club: club._id, status: "Pending" }),
      Event.countDocuments({ club: club._id, status: "Approved" }),
      Activity.countDocuments({ club: club._id, status: "Approved" }),
      Announcement.countDocuments({ club: club._id, status: "Approved" }),
    ]);

    return res.status(200).json({
      success: true,
      analytics: {
        clubName: club.name,
        totalMembers: activeMembersCount,
        activeMembers: activeMembersCount,
        pendingRequests: pendingRequestsCount,
        eventsCount,
        activitiesCount,
        announcementsCount,
        budgetAllocated: club.budgetAllocated || 25000,
        budgetSpent: club.budgetSpent || 5000,
        engagementRate: `${club.engagementRate || 85}%`,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch club analytics." });
  }
};
