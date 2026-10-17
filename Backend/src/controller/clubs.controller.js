import Club from "../models/Club.js";
import User from "../models/User.js";
import Membership from "../models/Membership.js";
import Approval from "../models/Approval.js";
import Notification from "../models/Notification.js";
import AuditLog from "../models/AuditLog.js";
import { UserRole } from "../constants/roles.js";
import { verifyTenantAccess } from "../middleware/tenant.middleware.js";

export const getAllClubs = async (req, res) => {
  try {
    const { search, category, status } = req.query;
    const filter = {};

    // Multi-tenant isolation: strictly filter by college if available
    if (req.collegeId) {
      filter.college = req.collegeId;
    }

    // Role-based visibility: regular students can ONLY discover Active clubs
    const isCollegeAdmin = req.user && (req.user.role === UserRole.COLLEGE_ADMIN || req.user.role === UserRole.PLATFORM_ADMIN);
    if (!isCollegeAdmin) {
      filter.status = "Active";
    } else if (status && status !== "all") {
      filter.status = status;
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const clubs = await Club.find(filter)
      .populate("president", "name email avatar department year")
      .populate("college", "name code")
      .sort({ createdAt: -1 });

    // If user is authenticated, determine membership & request status
    let userMemberships = new Set();
    let userPendingRequests = new Set();

    if (req.user) {
      const memberships = await Membership.find({ student: req.user._id });
      memberships.forEach((m) => {
        if (m.status === "Active") {
          userMemberships.add(m.club.toString());
        } else if (m.status === "Pending") {
          userPendingRequests.add(m.club.toString());
        }
      });
    }

    const formatted = clubs.map((c) => {
      const clubObj = c.toObject();
      const clubId = c._id.toString();
      const isMember = userMemberships.has(clubId);
      const isPending = userPendingRequests.has(clubId);

      return {
        ...clubObj,
        id: c._id,
        isMember,
        membershipStatus: isMember ? "Member" : isPending ? "Pending" : "Not Joined",
      };
    });

    return res.status(200).json({
      success: true,
      count: formatted.length,
      clubs: formatted,
    });
  } catch (error) {
    console.error("Get all clubs error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch clubs.",
    });
  }
};

export const getClubById = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findById(id)
      .populate("president", "name email avatar department year enrollmentNumber studentId phone")
      .populate("college", "name code");

    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found." });
    }

    // Tenant check
    if (req.user && !verifyTenantAccess(club.college, req)) {
      return res.status(403).json({ success: false, message: "Forbidden: Access to another college's club is not permitted." });
    }

    // Active members
    const memberships = await Membership.find({ club: club._id, status: "Active" })
      .populate("student", "name email avatar department year studentId enrollmentNumber")
      .sort({ createdAt: -1 });

    const recentMembers = memberships.map((m) => ({
      id: m.student?._id,
      name: m.student?.name || "Student",
      email: m.student?.email || "",
      department: m.student?.department || "General",
      year: m.student?.year || "1st Year",
      joinedDate: m.approvedAt || m.createdAt,
      avatar: m.student?.avatar || "/avatars/avatar-1.svg",
      role: m.role,
    }));

    let userStatus = "Not Joined";
    if (req.user) {
      const myMembership = await Membership.findOne({ club: club._id, student: req.user._id });
      if (myMembership) {
        userStatus = myMembership.status === "Active" ? "Member" : myMembership.status;
      }
    }

    return res.status(200).json({
      success: true,
      club: {
        ...club.toObject(),
        id: club._id,
        userStatus,
        recentMembers,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch club details." });
  }
};

export const createClub = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      sector,
      tags,
      coverImage,
      logo,
      objectives,
      activities,
      meetingSchedule,
      budgetAllocated,
      maxMembers,
      hiringDomains,
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Club name and description are required.",
      });
    }

    const collegeId = req.collegeId;

    // Check duplicate name within the same college
    const existingClub = await Club.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
      college: collegeId,
    });
    if (existingClub) {
      return res.status(409).json({
        success: false,
        message: "A club with this name already exists in your college.",
      });
    }

    // Club creation requires College Admin approval: status starts as Pending
    const newClub = await Club.create({
      name: name.trim(),
      college: collegeId,
      collegeName: req.user.collegeName || "",
      description: description.trim(),
      category: category || "Technical",
      sector: sector || "Technical & Innovation",
      tags: Array.isArray(tags) ? tags : ["Tech", "Engineering"],
      coverImage: coverImage || "",
      logo: logo || "💻",
      president: req.user._id,
      objectives: objectives || "",
      activities: activities || "",
      meetingSchedule: meetingSchedule || "Weekly meetups",
      budgetAllocated: budgetAllocated || 25000,
      maxMembers: maxMembers || 500,
      membersCount: 1,
      hiringDomains: Array.isArray(hiringDomains) ? hiringDomains : ["Technical & Coding"],
      status: "Pending",
    });

    // Automatically create creator's President membership
    await Membership.create({
      college: collegeId,
      student: req.user._id,
      club: newClub._id,
      role: "Club President",
      status: "Active",
      approvedAt: new Date(),
    });

    // Create approval item for College Admin
    await Approval.create({
      college: collegeId,
      requestedBy: req.user._id,
      actionType: "CLUB_CREATE",
      resourceType: "Club",
      resourceId: newClub._id,
      status: "Pending",
      metadata: {
        name: newClub.name,
        category: newClub.category,
        description: newClub.description,
        president: req.user.name,
      },
    });

    // Notify College Admin(s)
    const collegeAdmins = await User.find({
      college: collegeId,
      role: UserRole.COLLEGE_ADMIN,
    });

    for (const admin of collegeAdmins) {
      await Notification.create({
        recipient: admin._id,
        college: collegeId,
        title: "New Club Charter Request",
        message: `Club President ${req.user.name} submitted "${newClub.name}" for charter approval.`,
        type: "approval",
        relatedResource: {
          resourceType: "Club",
          resourceId: newClub._id,
        },
      });
    }

    // Audit Log
    await AuditLog.create({
      actorId: req.user._id,
      actorName: req.user.name,
      actorEmail: req.user.email,
      actorRole: req.user.role,
      college: collegeId,
      collegeName: req.user.collegeName,
      action: "CLUB_CREATED",
      title: "New Club Created (Pending Approval)",
      description: `${req.user.name} created club "${newClub.name}". Status is Pending College Admin review.`,
      resourceType: "Club",
      resourceId: newClub._id,
      type: "club",
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Club charter submitted successfully and is pending College Admin approval.",
      club: newClub,
    });
  } catch (error) {
    console.error("Create club error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create club.",
    });
  }
};

export const updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findById(id);

    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found." });
    }

    if (!verifyTenantAccess(club.college, req)) {
      return res.status(403).json({ success: false, message: "Forbidden: Cross-tenant modification denied." });
    }

    const isPresidentOfThisClub = club.president.toString() === req.user._id.toString();
    const isCollegeAdmin = req.user.role === UserRole.COLLEGE_ADMIN || req.user.role === UserRole.PLATFORM_ADMIN;

    if (!isPresidentOfThisClub && !isCollegeAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to edit this club.",
      });
    }

    const {
      name,
      description,
      category,
      sector,
      tags,
      coverImage,
      logo,
      objectives,
      activities,
      meetingSchedule,
      recruitmentOpen,
    } = req.body;

    const requestedChanges = {};
    if (name) requestedChanges.name = name.trim();
    if (description) requestedChanges.description = description.trim();
    if (category) requestedChanges.category = category;
    if (sector) requestedChanges.sector = sector;
    if (Array.isArray(tags)) requestedChanges.tags = tags;
    if (coverImage !== undefined) requestedChanges.coverImage = coverImage;
    if (logo) requestedChanges.logo = logo;
    if (objectives !== undefined) requestedChanges.objectives = objectives;
    if (activities !== undefined) requestedChanges.activities = activities;
    if (meetingSchedule) requestedChanges.meetingSchedule = meetingSchedule;
    if (recruitmentOpen !== undefined) requestedChanges.recruitmentOpen = recruitmentOpen;

    // If College Admin edits directly, apply immediately
    if (isCollegeAdmin) {
      Object.assign(club, requestedChanges);
      await club.save();

      await AuditLog.create({
        actorId: req.user._id,
        actorName: req.user.name,
        actorEmail: req.user.email,
        actorRole: req.user.role,
        college: club.college,
        action: "CLUB_UPDATED",
        title: "Club Updated by Admin",
        description: `College Admin updated details for "${club.name}".`,
        resourceType: "Club",
        resourceId: club._id,
        type: "club",
        status: "Success",
      });

      return res.status(200).json({
        success: true,
        message: "Club updated successfully by College Admin.",
        club,
      });
    }

    // When President edits: DO NOT overwrite active approved club data! Store into pendingChanges
    club.pendingChanges = requestedChanges;
    await club.save();

    // Create approval item
    await Approval.create({
      college: club.college,
      requestedBy: req.user._id,
      actionType: "CLUB_UPDATE",
      resourceType: "Club",
      resourceId: club._id,
      status: "Pending",
      metadata: {
        clubName: club.name,
        previous: {
          name: club.name,
          description: club.description,
          category: club.category,
          sector: club.sector,
        },
        requested: requestedChanges,
      },
    });

    // Notify College Admin
    const collegeAdmins = await User.find({
      college: club.college,
      role: UserRole.COLLEGE_ADMIN,
    });

    for (const admin of collegeAdmins) {
      await Notification.create({
        recipient: admin._id,
        college: club.college,
        title: "Club Information Update Request",
        message: `Club President ${req.user.name} submitted changes for "${club.name}". Awaiting review.`,
        type: "approval",
        relatedResource: {
          resourceType: "Club",
          resourceId: club._id,
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
      action: "CLUB_UPDATE_REQUESTED",
      title: "Club Edit Submitted for Approval",
      description: `${req.user.name} submitted edits for "${club.name}". Public data preserved pending approval.`,
      resourceType: "Club",
      resourceId: club._id,
      type: "club",
      status: "Pending",
    });

    return res.status(200).json({
      success: true,
      message: "Club edits submitted for College Admin approval. The currently approved version remains visible.",
      club,
    });
  } catch (error) {
    console.error("Update club error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update club.",
    });
  }
};

export const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findById(id);

    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found." });
    }

    if (!verifyTenantAccess(club.college, req)) {
      return res.status(403).json({ success: false, message: "Forbidden: Cross-tenant action denied." });
    }

    // Create approval item for club deletion
    await Approval.create({
      college: club.college,
      requestedBy: req.user._id,
      actionType: "CLUB_DELETE",
      resourceType: "Club",
      resourceId: club._id,
      status: "Pending",
      metadata: {
        clubName: club.name,
        membersCount: club.membersCount,
      },
    });

    // Notify College Admin
    const collegeAdmins = await User.find({
      college: club.college,
      role: UserRole.COLLEGE_ADMIN,
    });

    for (const admin of collegeAdmins) {
      await Notification.create({
        recipient: admin._id,
        college: club.college,
        title: "Club Deletion Request",
        message: `Club President ${req.user.name} requested deletion of "${club.name}".`,
        type: "approval",
        relatedResource: {
          resourceType: "Club",
          resourceId: club._id,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Club deletion request submitted for College Admin approval.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to request club deletion." });
  }
};
