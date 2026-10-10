import MembershipRequest from "../models/MembershipRequest.js";
import Membership from "../models/Membership.js";
import Club from "../models/Club.js";
import ActivityLog from "../models/ActivityLog.js";

export const submitRequest = async (req, res) => {
  try {
    const { clubId, note } = req.body;

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

    // Check existing membership
    const existingMembership = await Membership.findOne({
      club: club._id,
      student: req.user._id,
    });
    if (existingMembership) {
      return res.status(409).json({
        success: false,
        message: "You are already a member of this club.",
      });
    }

    // Check existing pending request
    const existingRequest = await MembershipRequest.findOne({
      club: club._id,
      student: req.user._id,
      status: "Pending",
    });
    if (existingRequest) {
      return res.status(409).json({
        success: false,
        message: "You already have a pending membership request for this club.",
      });
    }

    // Check membership limits
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
      note: note || "",
    });

    await ActivityLog.create({
      title: "New Membership Request",
      description: `${req.user.name} submitted a request to join ${club.name}.`,
      type: "student",
      club: club._id,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Membership request submitted successfully.",
      request: newRequest,
    });
  } catch (error) {
    console.error("Submit request error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to submit membership request.",
    });
  }
};

export const getMyRequests = async (req, res) => {
  try {
    const requests = await MembershipRequest.find({ student: req.user._id })
      .populate("club", "name description category logo status")
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
      status: "Pending",
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Pending request not found.",
      });
    }

    await MembershipRequest.findByIdAndDelete(request._id);

    return res.status(200).json({
      success: true,
      message: "Membership request cancelled.",
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
        return res.status(404).json({ success: false, message: "Club not found." });
      }

      if (
        req.user.role !== "admin" &&
        club.president.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You are not the president of this club.",
        });
      }

      filter.club = club._id;
    } else {
      // Find all clubs owned by this president
      if (req.user.role !== "admin") {
        const ownedClubs = await Club.find({ president: req.user._id }).select("_id");
        const clubIds = ownedClubs.map((c) => c._id);
        filter.club = { $in: clubIds };
      }
    }

    const requests = await MembershipRequest.find(filter)
      .populate("student", "name email avatar department year studentId enrollmentNumber bio")
      .populate("club", "name category logo")
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
    const { action } = req.body; // 'Approved' or 'Rejected'

    if (!["Approved", "Rejected"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Action must be either 'Approved' or 'Rejected'.",
      });
    }

    const request = await MembershipRequest.findById(id)
      .populate("club")
      .populate("student", "name email");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Membership request not found.",
      });
    }

    // Role check: Only assigned president or admin
    if (
      req.user.role !== "admin" &&
      request.club.president.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to review this request.",
      });
    }

    request.status = action;
    request.reviewDate = new Date();
    request.reviewer = req.user._id;
    await request.save();

    if (action === "Approved") {
      // Create membership record if not already created
      await Membership.findOneAndUpdate(
        { student: request.student._id, club: request.club._id },
        {
          student: request.student._id,
          club: request.club._id,
          role: "General Member",
          joinedDate: new Date(),
          status: "Active",
        },
        { upsert: true, new: true }
      );

      // Recalculate membersCount
      const totalMembers = await Membership.countDocuments({ club: request.club._id });
      request.club.membersCount = totalMembers;
      await request.club.save();

      await ActivityLog.create({
        title: "Membership Approved",
        description: `${request.student?.name} was welcomed into ${request.club?.name}.`,
        type: "student",
        club: request.club._id,
        user: request.student._id,
      });
    } else {
      await ActivityLog.create({
        title: "Membership Request Rejected",
        description: `Request for ${request.student?.name} to join ${request.club?.name} was rejected.`,
        type: "alert",
        club: request.club._id,
        user: req.user._id,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Membership request ${action.toLowerCase()} successfully.`,
      request,
    });
  } catch (error) {
    console.error("Review request error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to process request review.",
    });
  }
};
