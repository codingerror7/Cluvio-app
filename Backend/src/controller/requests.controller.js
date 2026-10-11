import MembershipRequest from "../models/MembershipRequest.js";
import Membership from "../models/Membership.js";
import Club from "../models/Club.js";
import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";

export const submitRequest = async (req, res) => {
  try {
    const {
      clubId,
      preferredDomain,
      skills,
      motivation,
      experience,
      availabilityHours,
      portfolioUrl,
      note,
    } = req.body;

    if (!clubId) {
      return res.status(400).json({
        success: false,
        message: "Club ID is required.",
      });
    }

    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found.",
      });
    }

    if (club.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "Cannot join an inactive or suspended club.",
      });
    }

    if (club.recruitmentOpen === false) {
      return res.status(400).json({
        success: false,
        message: "Recruitment for this club is currently closed.",
      });
    }

    // Check existing membership
    const existingMembership = await Membership.findOne({
      club: club._id,
      student: req.user._id,
    });
    if (existingMembership) {
      return res.status(409).json({
        success: false,
        message: "You are already an official member of this club.",
      });
    }

    // Check existing pending or interview scheduled request
    const existingRequest = await MembershipRequest.findOne({
      club: club._id,
      student: req.user._id,
      status: { $in: ["Pending", "Interview Scheduled"] },
    });
    if (existingRequest) {
      return res.status(409).json({
        success: false,
        message:
          existingRequest.status === "Interview Scheduled"
            ? "Your interview is already scheduled for this club."
            : "You already have a pending registration application for this club.",
      });
    }

    // Check membership capacity limits
    const currentMembers = await Membership.countDocuments({ club: club._id });
    if (club.maxMembers && currentMembers >= club.maxMembers) {
      return res.status(400).json({
        success: false,
        message: "This club has reached its maximum membership capacity.",
      });
    }

    const newRequest = await MembershipRequest.create({
      club: club._id,
      student: req.user._id,
      status: "Pending",
      preferredDomain: preferredDomain || "Technical & Coding",
      skills: Array.isArray(skills) ? skills : [],
      motivation: motivation || note || "",
      experience: experience || "",
      availabilityHours: availabilityHours || "3-5 hrs/week",
      portfolioUrl: portfolioUrl || "",
      note: note || motivation || "",
    });

    await ActivityLog.create({
      title: "New Club Application",
      description: `${req.user.name} submitted an application for ${club.name} (${newRequest.preferredDomain}).`,
      type: "student",
      club: club._id,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Membership registration form submitted successfully.",
      request: newRequest,
    });
  } catch (error) {
    console.error("Submit request error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to submit membership application.",
    });
  }
};

export const getMyRequests = async (req, res) => {
  try {
    const requests = await MembershipRequest.find({ student: req.user._id })
      .populate("club", "name description category logo status meetingSchedule")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch membership requests.",
    });
  }
};

export const cancelRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await MembershipRequest.findOne({
      _id: id,
      student: req.user._id,
      status: { $in: ["Pending", "Interview Scheduled"] },
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Active pending application not found.",
      });
    }

    await MembershipRequest.findByIdAndDelete(request._id);

    return res.status(200).json({
      success: true,
      message: "Membership application cancelled.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to cancel request.",
    });
  }
};

export const getClubRequests = async (req, res) => {
  try {
    const { clubId } = req.params;

    let filter = {};

    if (clubId && clubId !== "all") {
      const club = await Club.findById(clubId);
      if (!club) {
        return res
          .status(404)
          .json({ success: false, message: "Club not found." });
      }

      if (
        req.user.role !== "admin" &&
        club.president.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You are not the head of this club.",
        });
      }

      filter.club = club._id;
    } else {
      // Find all clubs owned by this head / president
      if (req.user.role !== "admin") {
        const ownedClubs = await Club.find({ president: req.user._id }).select(
          "_id"
        );
        const clubIds = ownedClubs.map((c) => c._id);
        filter.club = { $in: clubIds };
      }
    }

    const requests = await MembershipRequest.find(filter)
      .populate(
        "student",
        "name email avatar department year studentId enrollmentNumber bio age favouriteGenres"
      )
      .populate("club", "name category logo recruitmentOpen")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests: requests.map((r) => ({
        id: r._id,
        _id: r._id,
        student: r.student,
        club: r.club,
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
        note: r.note,
        requestDate: r.requestDate,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get club requests error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch club requests.",
    });
  }
};

export const reviewRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, feedback, rejectionReason, interviewDetails } = req.body;

    // Supported actions: Approved, Rejected, Interview Scheduled
    if (!["Approved", "Rejected", "Interview Scheduled"].includes(action)) {
      return res.status(400).json({
        success: false,
        message:
          "Action must be one of: 'Approved', 'Rejected', 'Interview Scheduled'.",
      });
    }

    const request = await MembershipRequest.findById(id)
      .populate("club")
      .populate("student", "name email role");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Membership request not found.",
      });
    }

    // Role check: Only assigned president/club head or admin
    if (
      req.user.role !== "admin" &&
      request.club.president.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to review this request.",
      });
    }

    request.reviewDate = new Date();
    request.reviewer = req.user._id;

    if (action === "Approved") {
      request.status = "Approved";
      request.feedback = feedback || "Congratulations, you have been accepted!";

      // 1. Create or update Membership record in this club
      const memberRole = request.preferredDomain
        ? `${request.preferredDomain} Member`
        : "Club Member";

      await Membership.findOneAndUpdate(
        { student: request.student._id, club: request.club._id },
        {
          student: request.student._id,
          club: request.club._id,
          role: memberRole,
          joinedDate: new Date(),
          status: "Active",
        },
        { upsert: true, new: true }
      );

      // 2. CONVERT STUDENT ROLE TO "club member" IF THEY WERE "student"
      const studentUser = await User.findById(request.student._id);
      if (studentUser && studentUser.role === "student") {
        studentUser.role = "club member";
        await studentUser.save();
      }

      // 3. Recalculate membersCount for the club
      const totalMembers = await Membership.countDocuments({
        club: request.club._id,
      });
      request.club.membersCount = totalMembers;
      await request.club.save();

      await ActivityLog.create({
        title: "Member Accepted",
        description: `${request.student?.name} was officially approved as a Club Member in ${request.club?.name}.`,
        type: "student",
        club: request.club._id,
        user: request.student._id,
      });
    } else if (action === "Rejected") {
      request.status = "Rejected";
      request.rejectionReason =
        rejectionReason ||
        feedback ||
        "Aapka form criteria ya seat limits ke karan reject kar diya gaya hai.";
      request.feedback = feedback || request.rejectionReason;

      await ActivityLog.create({
        title: "Application Rejected",
        description: `Application for ${request.student?.name} to join ${request.club?.name} was rejected.`,
        type: "alert",
        club: request.club._id,
        user: req.user._id,
      });
    } else if (action === "Interview Scheduled") {
      request.status = "Interview Scheduled";
      request.interviewDetails = interviewDetails || {};
      request.feedback =
        feedback || "Interview round scheduled. Please check date and venue details.";

      await ActivityLog.create({
        title: "Interview Scheduled",
        description: `Interview scheduled for ${request.student?.name} for ${request.club?.name}.`,
        type: "club",
        club: request.club._id,
        user: req.user._id,
      });
    }

    await request.save();

    return res.status(200).json({
      success: true,
      message: `Application ${action.toLowerCase()} successfully.`,
      request,
    });
  } catch (error) {
    console.error("Review request error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to process application review.",
    });
  }
};
