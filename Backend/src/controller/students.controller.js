import User from "../models/User.js";
import Membership from "../models/Membership.js";
import Event from "../models/Event.js";
import Approval from "../models/Approval.js";
import Notification from "../models/Notification.js";
import AuditLog from "../models/AuditLog.js";
import { UserRole } from "../constants/roles.js";

export const getStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user._id).select("-password").populate("college");
    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch student profile." });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const {
      name,
      department,
      course,
      year,
      phone,
      bio,
      avatar,
      favouriteGenres,
    } = req.body;

    const student = await User.findById(req.user._id).populate("college");
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    const previousProfile = {
      name: student.name,
      department: student.department,
      course: student.course,
      year: student.year,
      phone: student.phone,
      bio: student.bio,
      avatar: student.avatar,
    };

    if (name) student.name = name.trim();
    if (department) student.department = department.trim();
    if (course) student.course = course.trim();
    if (year) student.year = year.trim();
    if (phone !== undefined) student.phone = phone.trim();
    if (bio !== undefined) student.bio = bio.trim();
    if (avatar) student.avatar = avatar;
    if (Array.isArray(favouriteGenres)) student.favouriteGenres = favouriteGenres;

    // Changes enter Pending approval
    student.profileStatus = "Pending";
    student.profileRejectionReason = "";
    await student.save();

    // Create approval item
    await Approval.create({
      college: student.college._id,
      requestedBy: student._id,
      actionType: "PROFILE_UPDATE",
      resourceType: "User",
      resourceId: student._id,
      status: "Pending",
      metadata: {
        previous: previousProfile,
        requested: {
          name: student.name,
          department: student.department,
          course: student.course,
          year: student.year,
          phone: student.phone,
          bio: student.bio,
          avatar: student.avatar,
        },
      },
    });

    // Notify College Admin(s)
    const collegeAdmins = await User.find({
      college: student.college._id,
      role: UserRole.COLLEGE_ADMIN,
    });

    for (const admin of collegeAdmins) {
      await Notification.create({
        recipient: admin._id,
        college: student.college._id,
        title: "Student Profile Updated",
        message: `${student.name} (${student.enrollmentNumber || student.email}) submitted profile updates for review.`,
        type: "approval",
        relatedResource: {
          resourceType: "User",
          resourceId: student._id,
        },
      });
    }

    // Audit Log
    await AuditLog.create({
      actorId: student._id,
      actorName: student.name,
      actorEmail: student.email,
      actorRole: student.role,
      college: student.college._id,
      collegeName: student.college.name,
      action: "PROFILE_SUBMITTED",
      title: "Profile Submitted for Approval",
      description: `${student.name} updated profile details. Submitted for College Admin review.`,
      resourceType: "User",
      resourceId: student._id,
      type: "student",
      status: "Pending",
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated and submitted for College Admin approval.",
      student,
    });
  } catch (error) {
    console.error("Update student profile error:", error);
    return res.status(500).json({ success: false, message: error.message || "Failed to update profile." });
  }
};

export const getMyClubs = async (req, res) => {
  try {
    const memberships = await Membership.find({ student: req.user._id })
      .populate({
        path: "club",
        populate: { path: "president", select: "name email avatar department" },
      })
      .sort({ createdAt: -1 });

    const activeMemberships = memberships.filter((m) => m.status === "Active" && m.club);
    const pendingMemberships = memberships.filter((m) => m.status === "Pending" && m.club);

    return res.status(200).json({
      success: true,
      joinedClubs: activeMemberships.map((m) => ({
        ...m.club.toObject(),
        membershipId: m._id,
        role: m.role,
        joinedDate: m.approvedAt || m.createdAt,
      })),
      pendingClubs: pendingMemberships.map((m) => ({
        ...m.club.toObject(),
        membershipId: m._id,
        role: m.role,
        requestedDate: m.requestedAt || m.createdAt,
      })),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch student clubs." });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const memberships = await Membership.find({ student: req.user._id, status: "Active" });
    const clubIds = memberships.map((m) => m.club);

    const events = await Event.find({
      college: req.collegeId,
      status: "Approved",
      club: { $in: clubIds },
    })
      .populate("club", "name category logo")
      .sort({ date: 1 });

    return res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch student events." });
  }
};
