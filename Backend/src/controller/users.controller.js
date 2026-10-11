import User from "../models/User.js";
import Membership from "../models/Membership.js";
import MembershipRequest from "../models/MembershipRequest.js";
import Club from "../models/Club.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    let extraData = {};

    if (user.role === "student" || user.role === "club member") {
      const memberships = await Membership.find({ student: user._id })
        .populate("club", "name description category logo status meetingSchedule")
        .sort({ createdAt: -1 });

      const pendingRequests = await MembershipRequest.find({
        student: user._id,
      })
        .populate("club", "name description category logo meetingSchedule")
        .sort({ createdAt: -1 });

      extraData = {
        clubs: memberships.map((m) => ({
          membershipId: m._id,
          clubId: m.club?._id,
          clubName: m.club?.name || "Unknown Club",
          role: m.role,
          category: m.club?.category,
          logo: m.club?.logo,
          joinedDate: m.joinedDate,
          meetingSchedule: m.club?.meetingSchedule,
        })),
        clubsJoined: memberships.length,
        requests: pendingRequests.map((r) => ({
          requestId: r._id,
          clubId: r.club?._id,
          clubName: r.club?.name,
          category: r.club?.category,
          logo: r.club?.logo,
          status: r.status,
          preferredDomain: r.preferredDomain,
          skills: r.skills || [],
          motivation: r.motivation || r.note,
          experience: r.experience || "",
          availabilityHours: r.availabilityHours || "3-5 hrs/week",
          portfolioUrl: r.portfolioUrl || "",
          interviewDetails: r.interviewDetails || {},
          rejectionReason: r.rejectionReason || "",
          feedback: r.feedback || "",
          requestDate: r.requestDate,
        })),
        pendingRequestsCount: pendingRequests.filter(
          (r) => r.status === "Pending" || r.status === "Interview Scheduled"
        ).length,
      };
    } else if (user.role === "president" || user.role === "club head") {
      const ownedClubs = await Club.find({ president: user._id });
      extraData = {
        ownedClubs,
        clubsCount: ownedClubs.length,
      };
    }

    return res.status(200).json({
      success: true,
      user: {
        ...user.toJSON(),
        ...extraData,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to load profile.",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const {
      name,
      age,
      bio,
      enrollmentNumber,
      studentId,
      department,
      year,
      favouriteGenres,
      avatar,
    } = req.body;

    if (name) user.name = name.trim();
    if (age !== undefined) user.age = Number(age);
    if (bio !== undefined) user.bio = bio.trim();
    if (department) user.department = department.trim();
    if (year) user.year = year.trim();
    if (favouriteGenres && Array.isArray(favouriteGenres))
      user.favouriteGenres = favouriteGenres;
    if (avatar) user.avatar = avatar;

    const newEnroll = enrollmentNumber || studentId;
    if (newEnroll && newEnroll !== user.enrollmentNumber) {
      const duplicate = await User.findOne({
        _id: { $ne: user._id },
        $or: [{ enrollmentNumber: newEnroll }, { studentId: newEnroll }],
      });
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "Another account already uses this enrollment number.",
        });
      }
      user.enrollmentNumber = newEnroll;
      user.studentId = newEnroll;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile.",
    });
  }
};
