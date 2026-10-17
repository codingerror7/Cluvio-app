import Event from "../models/Event.js";
import Club from "../models/Club.js";
import Approval from "../models/Approval.js";
import Notification from "../models/Notification.js";
import AuditLog from "../models/AuditLog.js";
import { UserRole } from "../constants/roles.js";
import { verifyTenantAccess } from "../middleware/tenant.middleware.js";

export const getEvents = async (req, res) => {
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

    const events = await Event.find(filter)
      .populate("club", "name category logo")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch events." });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, description, clubId, date, startTime, endTime, location, capacity } = req.body;

    if (!title || !date) {
      return res.status(400).json({ success: false, message: "Title and date are required." });
    }

    // Resolve club
    let targetClub = null;
    if (clubId) {
      targetClub = await Club.findById(clubId);
    } else {
      targetClub = await Club.findOne({ president: req.user._id, college: req.collegeId });
    }

    if (!targetClub) {
      return res.status(404).json({ success: false, message: "Target club not found." });
    }

    if (!verifyTenantAccess(targetClub.college, req)) {
      return res.status(403).json({ success: false, message: "Forbidden: Cannot create event for another college's club." });
    }

    // Event enters Pending approval
    const newEvent = await Event.create({
      college: targetClub.college,
      club: targetClub._id,
      title: title.trim(),
      description: description ? description.trim() : "",
      date,
      startTime: startTime || "10:00 AM",
      endTime: endTime || "1:00 PM",
      location: location || "Campus Auditorium",
      capacity: capacity ? Number(capacity) : 100,
      status: "Pending",
      createdBy: req.user._id,
    });

    // Create approval item
    await Approval.create({
      college: targetClub.college,
      requestedBy: req.user._id,
      actionType: "EVENT_CREATE",
      resourceType: "Event",
      resourceId: newEvent._id,
      status: "Pending",
      metadata: {
        title: newEvent.title,
        clubName: targetClub.name,
        date: newEvent.date,
        location: newEvent.location,
      },
    });

    // Notify College Admin
    const collegeAdmins = await User.find({
      college: targetClub.college,
      role: UserRole.COLLEGE_ADMIN,
    });

    for (const admin of collegeAdmins) {
      await Notification.create({
        recipient: admin._id,
        college: targetClub.college,
        title: "New Event Proposal",
        message: `${req.user.name} submitted event "${newEvent.title}" (${targetClub.name}) for approval.`,
        type: "approval",
        relatedResource: {
          resourceType: "Event",
          resourceId: newEvent._id,
        },
      });
    }

    // Audit Log
    await AuditLog.create({
      actorId: req.user._id,
      actorName: req.user.name,
      actorEmail: req.user.email,
      actorRole: req.user.role,
      college: targetClub.college,
      action: "EVENT_CREATED",
      title: "Event Proposal Submitted",
      description: `${req.user.name} proposed event "${newEvent.title}". Awaiting College Admin approval.`,
      resourceType: "Event",
      resourceId: newEvent._id,
      type: "event",
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Event submitted for College Admin approval.",
      event: newEvent,
    });
  } catch (error) {
    console.error("Create event error:", error);
    return res.status(500).json({ success: false, message: error.message || "Failed to create event." });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }

    if (!verifyTenantAccess(event.college, req)) {
      return res.status(403).json({ success: false, message: "Forbidden: Cross-tenant action denied." });
    }

    const { title, description, date, startTime, endTime, location, capacity } = req.body;
    if (title) event.title = title.trim();
    if (description !== undefined) event.description = description.trim();
    if (date) event.date = date;
    if (startTime) event.startTime = startTime;
    if (endTime) event.endTime = endTime;
    if (location) event.location = location;
    if (capacity) event.capacity = Number(capacity);

    // Edits enter Pending approval if done by president
    if (req.user.role === UserRole.CLUB_PRESIDENT) {
      event.status = "Pending";
      await Approval.create({
        college: event.college,
        requestedBy: req.user._id,
        actionType: "EVENT_UPDATE",
        resourceType: "Event",
        resourceId: event._id,
        status: "Pending",
        metadata: {
          title: event.title,
          date: event.date,
        },
      });
    }

    await event.save();

    return res.status(200).json({
      success: true,
      message: "Event updated successfully.",
      event,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update event." });
  }
};
