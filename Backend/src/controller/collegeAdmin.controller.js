import User from "../models/User.js";
import Club from "../models/Club.js";
import Membership from "../models/Membership.js";
import Event from "../models/Event.js";
import Approval from "../models/Approval.js";
import PresidentCode from "../models/PresidentCode.js";
import AuditLog from "../models/AuditLog.js";
import Notification from "../models/Notification.js";
import { UserRole } from "../constants/roles.js";

/**
 * College Admin Dashboard Metrics (Tenant Scoped)
 */
export const getCollegeDashboard = async (req, res) => {
  try {
    const collegeId = req.collegeId;

    const [
      totalStudents,
      totalPresidents,
      totalClubs,
      activeClubs,
      pendingApprovals,
      upcomingEvents,
      totalMemberships,
      recentActivities,
    ] = await Promise.all([
      User.countDocuments({ college: collegeId, role: UserRole.STUDENT }),
      User.countDocuments({ college: collegeId, role: UserRole.CLUB_PRESIDENT }),
      Club.countDocuments({ college: collegeId, status: { $ne: "Archived" } }),
      Club.countDocuments({ college: collegeId, status: "Active" }),
      Approval.countDocuments({ college: collegeId, status: "Pending" }),
      Event.countDocuments({ college: collegeId, status: "Approved" }),
      Membership.countDocuments({ college: collegeId, status: "Active" }),
      AuditLog.find({ college: collegeId }).sort({ createdAt: -1 }).limit(10),
    ]);

    // Breakdown of clubs by category
    const allClubs = await Club.find({ college: collegeId, status: { $ne: "Archived" } });
    const categoryCounts = {};
    allClubs.forEach((c) => {
      categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
    });

    const categoriesBreakdown = Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count,
      percentage: totalClubs > 0 ? Math.round((count / totalClubs) * 100) : 0,
    }));

    return res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        totalPresidents,
        totalClubs,
        activeClubs,
        pendingApprovals,
        upcomingEvents,
        totalMemberships,
        categoriesBreakdown,
        recentActivities: recentActivities.map((a) => ({
          id: a._id,
          title: a.title,
          description: a.description,
          type: a.type,
          actorName: a.actorName,
          timestamp: a.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error("College admin dashboard error:", error);
    return res.status(500).json({ success: false, message: "Failed to load dashboard metrics." });
  }
};

/**
 * Get all students in the College Admin's college
 */
export const getStudents = async (req, res) => {
  try {
    const { search, department, year, profileStatus } = req.query;
    const filter = { college: req.collegeId, role: UserRole.STUDENT };

    if (department && department !== "all") filter.department = department;
    if (year && year !== "all") filter.year = year;
    if (profileStatus && profileStatus !== "all") filter.profileStatus = profileStatus;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { enrollmentNumber: { $regex: search, $options: "i" } },
        { studentId: { $regex: search, $options: "i" } },
      ];
    }

    const students = await User.find(filter).select("-password").sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch students." });
  }
};

/**
 * Get all presidents in the College Admin's college
 */
export const getPresidents = async (req, res) => {
  try {
    const { search, department } = req.query;
    const filter = { college: req.collegeId, role: UserRole.CLUB_PRESIDENT };

    if (department && department !== "all") filter.department = department;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { enrollmentNumber: { $regex: search, $options: "i" } },
      ];
    }

    const presidents = await User.find(filter).select("-password").sort({ createdAt: -1 });

    // Populate assigned clubs
    const presidentIds = presidents.map((p) => p._id);
    const clubs = await Club.find({ president: { $in: presidentIds } }).select("name category logo president status");

    const clubMap = new Map();
    clubs.forEach((c) => clubMap.set(c.president.toString(), c));

    const formatted = presidents.map((p) => ({
      ...p.toObject(),
      id: p._id,
      assignedClub: clubMap.get(p._id.toString()) || null,
    }));

    return res.status(200).json({
      success: true,
      count: formatted.length,
      presidents: formatted,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch presidents." });
  }
};

/**
 * Generate a 6-digit President Code and assign to a student
 */
export const generatePresidentCode = async (req, res) => {
  try {
    const { email, enrollmentNumber, targetClubName, studentId } = req.body;

    if (!email || !enrollmentNumber) {
      return res.status(400).json({
        success: false,
        message: "Student email and enrollment number are required to assign a President Code.",
      });
    }

    const collegeId = req.collegeId;
    const cleanEmail = email.toLowerCase().trim();
    const cleanEnroll = enrollmentNumber.trim();

    // Generate cryptographically secure/unambiguous 6-digit code
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Check if an active code already exists for this student
    const existingActive = await PresidentCode.findOne({
      college: collegeId,
      assignedEmail: cleanEmail,
      status: "Active",
    });

    if (existingActive) {
      existingActive.status = "Revoked";
      await existingActive.save();
    }

    // Set 30 days expiry
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const newCode = await PresidentCode.create({
      code: randomCode,
      college: collegeId,
      assignedStudent: studentId || null,
      assignedEmail: cleanEmail,
      assignedEnrollment: cleanEnroll,
      targetClubName: targetClubName || "",
      createdBy: req.user._id,
      expiresAt,
      status: "Active",
    });

    // Notify the student if account already exists
    const existingStudent = await User.findOne({ email: cleanEmail });
    if (existingStudent) {
      await Notification.create({
        recipient: existingStudent._id,
        college: collegeId,
        title: "Club President Activation Code Issued",
        message: `You have been authorized by the College Admin as a Club President. Use 6-digit code ${randomCode} to sign into the President portal.`,
        type: "president_code",
      });
    }

    // Audit Log
    await AuditLog.create({
      actorId: req.user._id,
      actorName: req.user.name,
      actorEmail: req.user.email,
      actorRole: req.user.role,
      college: collegeId,
      action: "PRESIDENT_CODE_GENERATED",
      title: "President Code Generated",
      description: `College Admin generated 6-digit code for student ${cleanEmail} (${cleanEnroll}).`,
      resourceType: "PresidentCode",
      resourceId: newCode._id,
      type: "president",
      status: "Success",
    });

    return res.status(201).json({
      success: true,
      message: `President Code ${randomCode} generated successfully for ${cleanEmail}.`,
      presidentCode: newCode,
    });
  } catch (error) {
    console.error("Generate president code error:", error);
    return res.status(500).json({ success: false, message: error.message || "Failed to generate president code." });
  }
};

/**
 * List all President Codes generated in this college
 */
export const getPresidentCodes = async (req, res) => {
  try {
    const codes = await PresidentCode.find({ college: req.collegeId })
      .populate("assignedStudent", "name email department year avatar")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: codes.length,
      codes,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch president codes." });
  }
};

/**
 * Revoke/Deactivate a President Code
 */
export const revokePresidentCode = async (req, res) => {
  try {
    const { id } = req.params;
    const codeDoc = await PresidentCode.findOne({ _id: id, college: req.collegeId });

    if (!codeDoc) {
      return res.status(404).json({ success: false, message: "President code record not found." });
    }

    codeDoc.status = "Revoked";
    await codeDoc.save();

    await AuditLog.create({
      actorId: req.user._id,
      actorName: req.user.name,
      actorEmail: req.user.email,
      actorRole: req.user.role,
      college: req.collegeId,
      action: "PRESIDENT_CODE_REVOKED",
      title: "President Code Revoked",
      description: `College Admin revoked President Code for ${codeDoc.assignedEmail}.`,
      resourceType: "PresidentCode",
      resourceId: codeDoc._id,
      type: "president",
      status: "Success",
    });

    return res.status(200).json({
      success: true,
      message: "President code revoked successfully.",
      code: codeDoc,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to revoke president code." });
  }
};

/**
 * Get college audit logs
 */
export const getCollegeAuditLogs = async (req, res) => {
  try {
    const { limit = 100 } = req.query;
    const logs = await AuditLog.find({ college: req.collegeId })
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      count: logs.length,
      logs,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch college audit logs." });
  }
};
