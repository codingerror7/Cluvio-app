import User from "../models/User.js";
import Club from "../models/Club.js";
import College from "../models/College.js";
import AuditLog from "../models/AuditLog.js";
import Approval from "../models/Approval.js";
import { UserRole } from "../constants/roles.js";

export const getPlatformStats = async (req, res) => {
  try {
    const [
      totalColleges,
      totalUsers,
      totalStudents,
      totalPresidents,
      totalClubs,
      totalApprovals,
      recentActivityDocs,
    ] = await Promise.all([
      College.countDocuments({ status: "Active" }),
      User.countDocuments(),
      User.countDocuments({ role: UserRole.STUDENT }),
      User.countDocuments({ role: UserRole.CLUB_PRESIDENT }),
      Club.countDocuments({ status: { $ne: "Archived" } }),
      Approval.countDocuments(),
      AuditLog.find().sort({ createdAt: -1 }).limit(25),
    ]);

    const activeClubs = await Club.countDocuments({ status: "Active" });

    // Category distribution across platform
    const allClubs = await Club.find({ status: { $ne: "Archived" } });
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
        totalColleges,
        totalUsers,
        totalStudents,
        clubPresidents: totalPresidents,
        totalClubs,
        activeClubs,
        totalApprovals,
        categoriesBreakdown,
        systemHealth: "Operational",
        recentActivities: recentActivityDocs.map((act) => ({
          id: act._id,
          actorName: act.actorName,
          actorRole: act.actorRole,
          collegeName: act.collegeName || "Global",
          action: act.action,
          title: act.title,
          description: act.description,
          type: act.type,
          timestamp: act.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error("Platform stats error:", error);
    return res.status(500).json({ success: false, message: "Failed to load platform stats." });
  }
};

export const getCollegesList = async (req, res) => {
  try {
    const colleges = await College.find().sort({ name: 1 });
    const collegeIds = colleges.map((c) => c._id);

    const [clubs, students, presidents] = await Promise.all([
      Club.find({ college: { $in: collegeIds } }).select("college status"),
      User.find({ college: { $in: collegeIds }, role: UserRole.STUDENT }).select("college"),
      User.find({ college: { $in: collegeIds }, role: UserRole.CLUB_PRESIDENT }).select("college"),
    ]);

    const statsMap = new Map();
    colleges.forEach((c) => {
      statsMap.set(c._id.toString(), { clubs: 0, students: 0, presidents: 0 });
    });

    clubs.forEach((c) => {
      const entry = statsMap.get(c.college.toString());
      if (entry) entry.clubs++;
    });

    students.forEach((s) => {
      if (s.college) {
        const entry = statsMap.get(s.college.toString());
        if (entry) entry.students++;
      }
    });

    presidents.forEach((p) => {
      if (p.college) {
        const entry = statsMap.get(p.college.toString());
        if (entry) entry.presidents++;
      }
    });

    const enriched = colleges.map((c) => ({
      ...c.toObject(),
      id: c._id,
      stats: statsMap.get(c._id.toString()) || { clubs: 0, students: 0, presidents: 0 },
    }));

    return res.status(200).json({
      success: true,
      colleges: enriched,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch colleges." });
  }
};

export const createCollegeTenant = async (req, res) => {
  try {
    const { name, code, address, adminEmail } = req.body;

    if (!name || !code) {
      return res.status(400).json({ success: false, message: "College name and code are required." });
    }

    const existing = await College.findOne({
      $or: [{ code: code.toUpperCase().trim() }, { name: name.trim() }],
    });

    if (existing) {
      return res.status(409).json({ success: false, message: "College with this name or code already exists." });
    }

    const college = await College.create({
      name: name.trim(),
      code: code.toUpperCase().trim(),
      address: address || "",
      adminEmail: adminEmail ? adminEmail.toLowerCase().trim() : "",
      status: "Active",
    });

    return res.status(201).json({
      success: true,
      message: "College tenant created successfully.",
      college,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Failed to create college." });
  }
};

export const getActivityFeed = async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const logs = await AuditLog.find()
      .populate("college", "name code")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await AuditLog.countDocuments();

    return res.status(200).json({
      success: true,
      total,
      logs: logs.map((l) => ({
        id: l._id,
        actor: l.actorName,
        role: l.actorRole,
        action: l.action,
        resource: l.resourceType,
        college: l.college?.name || l.collegeName || "Global Platform",
        timestamp: l.createdAt,
        status: l.status,
        description: l.description,
      })),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch activity feed." });
  }
};

export const getPlatformUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (role && role !== "all") filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter)
      .select("-password")
      .populate("college", "name code")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await User.countDocuments(filter);

    return res.status(200).json({
      success: true,
      total,
      users,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch users." });
  }
};
