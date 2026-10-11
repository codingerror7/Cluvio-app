import Club from "../models/Club.js";
import User from "../models/User.js";
import Membership from "../models/Membership.js";
import MembershipRequest from "../models/MembershipRequest.js";
import ActivityLog from "../models/ActivityLog.js";

export const getAllClubs = async (req, res) => {
  try {
    const { search, category, status } = req.query;
    const filter = {};

    if (status && status !== "all") {
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
      .sort({ createdAt: -1 });

    // If user is authenticated, check their membership & request status
    let userMemberships = new Set();
    let userRequests = new Map();

    if (req.user) {
      const memberships = await Membership.find({ student: req.user._id });
      memberships.forEach((m) => userMemberships.add(m.club.toString()));

      const requests = await MembershipRequest.find({ student: req.user._id });
      requests.forEach((r) => userRequests.set(r.club.toString(), r.status));
    }

    const formatted = clubs.map((c) => {
      const clubObj = c.toObject();
      const clubId = c._id.toString();
      return {
        ...clubObj,
        id: c._id,
        isMember: userMemberships.has(clubId),
        membershipStatus: userMemberships.has(clubId)
          ? "Member"
          : userRequests.get(clubId) || "Not Joined",
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
    const club = await Club.findById(id).populate(
      "president",
      "name email avatar department year enrollmentNumber studentId"
    );

    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found." });
    }

    // Get active members for detail view
    const memberships = await Membership.find({ club: club._id })
      .populate("student", "name email avatar department year studentId enrollmentNumber")
      .sort({ createdAt: -1 });

    const recentMembers = memberships.map((m) => ({
      id: m.student?._id,
      name: m.student?.name || "Student",
      email: m.student?.email || "",
      department: m.student?.department || "General",
      year: m.student?.year || "1st Year",
      joinedDate: m.joinedDate ? new Date(m.joinedDate).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }) : "",
      avatar: m.student?.avatar || "",
      role: m.role,
    }));

    // Check current user status if authenticated
    let userStatus = "Not Joined";
    if (req.user) {
      const isMember = memberships.some(
        (m) => m.student?._id?.toString() === req.user._id.toString()
      );
      if (isMember) {
        userStatus = "Member";
      } else {
        const reqDoc = await MembershipRequest.findOne({
          club: club._id,
          student: req.user._id,
        }).sort({ createdAt: -1 });
        if (reqDoc) userStatus = reqDoc.status;
      }
    }

    const clubObj = club.toObject();
    return res.status(200).json({
      success: true,
      club: {
        ...clubObj,
        id: club._id,
        membersCount: memberships.length,
        recentMembers,
        userStatus,
      },
    });
  } catch (error) {
    console.error("Get club by ID error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve club details.",
    });
  }
};

export const createClub = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      logo,
      objectives,
      activities,
      meetingSchedule,
      maxMembers,
      presidentId,
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Club name and description are required.",
      });
    }

    // Check duplicate name
    const existing = await Club.findOne({ name: { $regex: `^${name.trim()}$`, $options: "i" } });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "A club with this name already exists.",
      });
    }

    let assignedPresidentId = req.user._id;

    // Admin can specify a different president
    if (req.user.role === "admin" && presidentId) {
      const presUser = await User.findById(presidentId);
      if (!presUser) {
        return res.status(404).json({
          success: false,
          message: "Designated president user was not found.",
        });
      }
      assignedPresidentId = presUser._id;
    }

    const club = await Club.create({
      name: name.trim(),
      description: description.trim(),
      category: category || "Technical",
      logo: logo || "💻",
      president: assignedPresidentId,
      objectives: objectives || "",
      activities: activities || "",
      meetingSchedule: meetingSchedule || "Weekly on Wednesdays",
      maxMembers: maxMembers ? Number(maxMembers) : 500,
      membersCount: 1,
      status: "Active",
    });

    // Add president as first member
    try {
      await Membership.create({
        student: assignedPresidentId,
        club: club._id,
        role: "Core Team",
      });
    } catch (e) {
      // ignore duplicate
    }

    // Activity log
    await ActivityLog.create({
      title: "New Club Chartered",
      description: `${club.name} (${club.category}) was created and chartered.`,
      type: "club",
      club: club._id,
      user: req.user._id,
    });

    const populated = await Club.findById(club._id).populate(
      "president",
      "name email avatar department year"
    );

    return res.status(201).json({
      success: true,
      message: "Club chartered successfully.",
      club: {
        ...populated.toObject(),
        id: populated._id,
      },
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

    // Role check: Only assigned president or admin
    if (
      req.user.role !== "admin" &&
      club.president.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to edit this club.",
      });
    }

    const {
      name,
      description,
      category,
      logo,
      objectives,
      activities,
      meetingSchedule,
      maxMembers,
      status,
      presidentId,
    } = req.body;

    if (name && name.trim() !== club.name) {
      const duplicate = await Club.findOne({
        _id: { $ne: club._id },
        name: { $regex: `^${name.trim()}$`, $options: "i" },
      });
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "Another club is already using this name.",
        });
      }
      club.name = name.trim();
    }

    if (description) club.description = description.trim();
    if (category) club.category = category;
    if (logo) club.logo = logo;
    if (objectives !== undefined) club.objectives = objectives;
    if (activities !== undefined) club.activities = activities;
    if (meetingSchedule !== undefined) club.meetingSchedule = meetingSchedule;
    if (maxMembers) club.maxMembers = Number(maxMembers);
    if (status) club.status = status;

    // Admin can reassign president
    if (req.user.role === "admin" && presidentId) {
      const newPres = await User.findById(presidentId);
      if (newPres) {
        club.president = newPres._id;
      }
    }

    await club.save();

    await ActivityLog.create({
      title: "Club Details Updated",
      description: `${club.name} details were updated by ${req.user.name}.`,
      type: "club",
      club: club._id,
      user: req.user._id,
    });

    const populated = await Club.findById(club._id).populate(
      "president",
      "name email avatar department year"
    );

    return res.status(200).json({
      success: true,
      message: "Club updated successfully.",
      club: {
        ...populated.toObject(),
        id: populated._id,
      },
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

    // Role check: Only assigned president or admin
    if (
      req.user.role !== "admin" &&
      club.president.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to delete this club.",
      });
    }

    const clubName = club.name;

    // Clean up memberships and requests associated with this club
    await Membership.deleteMany({ club: club._id });
    await MembershipRequest.deleteMany({ club: club._id });
    await Club.findByIdAndDelete(club._id);

    await ActivityLog.create({
      title: "Club Dissolved",
      description: `${clubName} was permanently dissolved and removed.`,
      type: "alert",
      user: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: `Club '${clubName}' was deleted successfully.`,
    });
  } catch (error) {
    console.error("Delete club error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete club.",
    });
  }
};

export const getClubMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const memberships = await Membership.find({ club: id })
      .populate("student", "name email avatar department year studentId enrollmentNumber")
      .sort({ createdAt: -1 });

    const members = memberships.map((m) => ({
      id: m.student?._id,
      membershipId: m._id,
      name: m.student?.name || "Student",
      email: m.student?.email || "",
      department: m.student?.department || "General",
      year: m.student?.year || "1st Year",
      studentId: m.student?.studentId || m.student?.enrollmentNumber || "",
      avatar: m.student?.avatar || "",
      role: m.role,
      joinedDate: m.joinedDate,
    }));

    return res.status(200).json({
      success: true,
      count: members.length,
      members,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch club members.",
    });
  }
};

export const removeMember = async (req, res) => {
  try {
    const { id, studentId } = req.params;
    const club = await Club.findById(id);

    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found." });
    }

    if (
      req.user.role !== "admin" &&
      club.president.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to manage members of this club.",
      });
    }

    // Remove membership
    const deleted = await Membership.findOneAndDelete({
      club: club._id,
      student: studentId,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Membership record not found.",
      });
    }

    // Update count
    const remainingCount = await Membership.countDocuments({ club: club._id });
    club.membersCount = remainingCount;
    await club.save();

    return res.status(200).json({
      success: true,
      message: "Member removed from club successfully.",
      membersCount: remainingCount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to remove member.",
    });
  }
};

export const addEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, time, location, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Event title is required." });
    }

    const club = await Club.findById(id);
    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found." });
    }

    if (
      req.user.role !== "admin" &&
      club.president.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to manage events for this club.",
      });
    }

    const newEvent = {
      title: title.trim(),
      date: date || new Date().toISOString().split("T")[0],
      time: time || "5:00 PM",
      location: location || "Campus Center",
      description: description || "",
      status: status || "Upcoming",
      attendees: 0,
    };

    club.recentEvents.unshift(newEvent);
    club.eventsCount = club.recentEvents.length;
    await club.save();

    return res.status(201).json({
      success: true,
      message: "Activity event added successfully.",
      event: club.recentEvents[0],
      events: club.recentEvents,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removeEvent = async (req, res) => {
  try {
    const { id, eventId } = req.params;
    const club = await Club.findById(id);
    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found." });
    }

    if (
      req.user.role !== "admin" &&
      club.president.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to manage events for this club.",
      });
    }

    club.recentEvents = club.recentEvents.filter(
      (e) => e._id.toString() !== eventId
    );
    club.eventsCount = club.recentEvents.length;
    await club.save();

    return res.status(200).json({
      success: true,
      message: "Event removed successfully.",
      events: club.recentEvents,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, priority } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Title and message are required for announcement.",
      });
    }

    const club = await Club.findById(id);
    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found." });
    }

    if (
      req.user.role !== "admin" &&
      club.president.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to post announcements for this club.",
      });
    }

    const announcement = {
      title: title.trim(),
      message: message.trim(),
      priority: priority || "Normal",
      date: new Date().toLocaleDateString("en-GB"),
      createdAt: new Date(),
    };

    club.announcements.unshift(announcement);
    await club.save();

    return res.status(201).json({
      success: true,
      message: "Announcement posted successfully.",
      announcement: club.announcements[0],
      announcements: club.announcements,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removeAnnouncement = async (req, res) => {
  try {
    const { id, announcementId } = req.params;
    const club = await Club.findById(id);
    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found." });
    }

    if (
      req.user.role !== "admin" &&
      club.president.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to delete announcements for this club.",
      });
    }

    club.announcements = club.announcements.filter(
      (a) => a._id.toString() !== announcementId
    );
    await club.save();

    return res.status(200).json({
      success: true,
      message: "Announcement removed.",
      announcements: club.announcements,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRecruitmentSettings = async (req, res) => {
  try {
    const { id } = req.params;
    const { recruitmentOpen, hiringDomains } = req.body;

    const club = await Club.findById(id);
    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found." });
    }

    if (
      req.user.role !== "admin" &&
      club.president.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to update settings for this club.",
      });
    }

    if (typeof recruitmentOpen === "boolean") {
      club.recruitmentOpen = recruitmentOpen;
    }
    if (Array.isArray(hiringDomains)) {
      club.hiringDomains = hiringDomains;
    }

    await club.save();

    return res.status(200).json({
      success: true,
      message: "Recruitment settings updated successfully.",
      recruitmentOpen: club.recruitmentOpen,
      hiringDomains: club.hiringDomains,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

