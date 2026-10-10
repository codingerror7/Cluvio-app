import User from "../models/User.js";
import Club from "../models/Club.js";
import Membership from "../models/Membership.js";
import MembershipRequest from "../models/MembershipRequest.js";
import ActivityLog from "../models/ActivityLog.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalStudents,
      clubPresidents,
      totalClubs,
      activeClubs,
      pendingApprovals,
      totalMemberships,
      recentActivityDocs,
      allClubs,
    ] = await Promise.all([
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "president" }),
      Club.countDocuments(),
      Club.countDocuments({ status: "Active" }),
      MembershipRequest.countDocuments({ status: "Pending" }),
      Membership.countDocuments(),
      ActivityLog.find().sort({ createdAt: -1 }).limit(8),
      Club.find().populate("president", "name avatar email"),
    ]);

    // Categories breakdown
    const categoryCounts = {};
    allClubs.forEach((c) => {
      categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
    });

    const categoriesBreakdown = Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count,
      percentage: totalClubs > 0 ? Math.round((count / totalClubs) * 100) : 0,
    }));

    // Top clubs ranking
    const topClubsRanking = allClubs
      .slice()
      .sort((a, b) => (b.membersCount || 0) - (a.membersCount || 0))
      .slice(0, 5)
      .map((c) => ({
        id: c._id,
        name: c.name,
        category: c.category,
        members: c.membersCount || 1,
        events: c.eventsCount || 0,
        engagement: c.engagementRate || 85,
        avatar: c.logo || "💻",
      }));

    // Formatted activities
    const recentActivities = recentActivityDocs.map((act) => ({
      id: act._id,
      title: act.title,
      description: act.description,
      type: act.type,
      timestamp: act.createdAt ? new Date(act.createdAt).toLocaleDateString("en-GB", { hour: '2-digit', minute: '2-digit' }) : "Just now",
    }));

    return res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        clubPresidents,
        totalClubs,
        activeClubs,
        pendingApprovals,
        totalMemberships,
        engagementRate: "88.4%",
        categoriesBreakdown,
        topClubsRanking,
        recentActivities,
      },
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to load dashboard metrics.",
    });
  }
};

// ----------------- STUDENT CRUD -----------------

export const getAllStudents = async (req, res) => {
  try {
    const { search, department, year, status } = req.query;
    const filter = { role: "student" };

    if (department && department !== "all") {
      filter.department = department;
    }
    if (year && year !== "all") {
      filter.year = year;
    }
    if (status && status !== "all") {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { enrollmentNumber: { $regex: search, $options: "i" } },
        { studentId: { $regex: search, $options: "i" } },
      ];
    }

    const students = await User.find(filter).sort({ createdAt: -1 });

    // Count clubs joined for each student
    const studentIds = students.map((s) => s._id);
    const memberships = await Membership.find({ student: { $in: studentIds } });

    const countsMap = new Map();
    memberships.forEach((m) => {
      const sId = m.student.toString();
      countsMap.set(sId, (countsMap.get(sId) || 0) + 1);
    });

    const formatted = students.map((s) => ({
      id: s._id,
      _id: s._id,
      name: s.name,
      email: s.email,
      studentId: s.studentId || s.enrollmentNumber || "STU-" + s._id.toString().slice(-4).toUpperCase(),
      enrollmentNumber: s.enrollmentNumber || s.studentId,
      department: s.department || "Computer Science",
      year: s.year || "1st Year",
      status: s.status || "Active",
      avatar: s.avatar || "",
      age: s.age,
      bio: s.bio,
      favouriteGenres: s.favouriteGenres || [],
      clubsJoined: countsMap.get(s._id.toString()) || 0,
      eventsJoined: 3,
      joinedDate: s.createdAt ? new Date(s.createdAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }) : "Recently",
      participationRate: "85%",
    }));

    return res.status(200).json({
      success: true,
      count: formatted.length,
      students: formatted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch students.",
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: "student" });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student record not found." });
    }

    const memberships = await Membership.find({ student: student._id })
      .populate("club", "name category logo description status")
      .sort({ createdAt: -1 });

    const requests = await MembershipRequest.find({ student: student._id })
      .populate("club", "name category logo")
      .sort({ createdAt: -1 });

    const clubs = memberships.map((m) => ({
      id: m._id,
      clubId: m.club?._id,
      clubName: m.club?.name || "Unknown Club",
      role: m.role,
      joinedDate: m.joinedDate ? new Date(m.joinedDate).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }) : "Recently",
    }));

    return res.status(200).json({
      success: true,
      student: {
        id: student._id,
        _id: student._id,
        name: student.name,
        email: student.email,
        studentId: student.studentId || student.enrollmentNumber || "",
        department: student.department || "Computer Science",
        year: student.year || "1st Year",
        status: student.status || "Active",
        avatar: student.avatar || "",
        bio: student.bio || "",
        age: student.age,
        favouriteGenres: student.favouriteGenres || [],
        clubsJoined: memberships.length,
        eventsJoined: 4,
        participationRate: "88%",
        joinedDate: student.createdAt ? new Date(student.createdAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }) : "Recently",
        clubs,
        requests: requests.map((r) => ({
          id: r._id,
          clubName: r.club?.name,
          category: r.club?.category,
          status: r.status,
          date: r.requestDate,
        })),
        events: [],
        activity: [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to load student details.",
    });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, email, password, enrollmentNumber, studentId, department, year, age, bio, favouriteGenres } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: "A user with this email already exists." });
    }

    const enroll = enrollmentNumber || studentId || "STU-" + Date.now().toString().slice(-4);
    const student = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: "student",
      enrollmentNumber: enroll,
      studentId: enroll,
      department: department || "Computer Science",
      year: year || "1st Year",
      age: age ? Number(age) : 20,
      bio: bio || "",
      favouriteGenres: Array.isArray(favouriteGenres) ? favouriteGenres : [],
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    });

    await ActivityLog.create({
      title: "Student Added by Admin",
      description: `${student.name} was added to the platform roster.`,
      type: "student",
      user: student._id,
    });

    return res.status(201).json({
      success: true,
      message: "Student account created successfully.",
      student: student.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create student.",
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: "student" });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student record not found." });
    }

    const { name, email, department, year, status, enrollmentNumber, studentId, age, bio } = req.body;

    if (name) student.name = name.trim();
    if (email && email.toLowerCase() !== student.email) {
      const existing = await User.findOne({ email: email.toLowerCase(), _id: { $ne: student._id } });
      if (existing) {
        return res.status(409).json({ success: false, message: "Email already taken by another account." });
      }
      student.email = email.toLowerCase().trim();
    }

    if (department) student.department = department;
    if (year) student.year = year;
    if (status) student.status = status;
    if (age !== undefined) student.age = Number(age);
    if (bio !== undefined) student.bio = bio;

    const enroll = enrollmentNumber || studentId;
    if (enroll) {
      student.enrollmentNumber = enroll;
      student.studentId = enroll;
    }

    await student.save();

    return res.status(200).json({
      success: true,
      message: "Student profile updated successfully.",
      student: student.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update student.",
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: "student" });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    await Membership.deleteMany({ student: student._id });
    await MembershipRequest.deleteMany({ student: student._id });
    await User.findByIdAndDelete(student._id);

    await ActivityLog.create({
      title: "Student Removed",
      description: `${student.name} profile was removed from Cluvio.`,
      type: "alert",
    });

    return res.status(200).json({
      success: true,
      message: "Student record deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete student.",
    });
  }
};

// ----------------- PRESIDENT CRUD -----------------

export const getAllPresidents = async (req, res) => {
  try {
    const { search, status } = req.query;
    const filter = { role: "president" };

    if (status && status !== "all") {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { studentId: { $regex: search, $options: "i" } },
        { enrollmentNumber: { $regex: search, $options: "i" } },
      ];
    }

    const presidents = await User.find(filter).sort({ createdAt: -1 });

    // Find owned clubs for each president
    const presIds = presidents.map((p) => p._id);
    const clubs = await Club.find({ president: { $in: presIds } });

    const clubMap = new Map();
    clubs.forEach((c) => {
      clubMap.set(c.president.toString(), c);
    });

    const formatted = presidents.map((p) => {
      const assignedClub = clubMap.get(p._id.toString());
      return {
        id: p._id,
        _id: p._id,
        name: p.name,
        email: p.email,
        studentId: p.studentId || p.enrollmentNumber || "PRES-" + p._id.toString().slice(-4).toUpperCase(),
        department: p.department || "Computer Science",
        year: p.year || "3rd Year",
        status: p.status || "Active",
        avatar: p.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        clubId: assignedClub?._id || "",
        clubName: assignedClub?.name || "Unassigned",
        clubMembers: assignedClub?.membersCount || 1,
        eventsCreated: assignedClub?.eventsCount || 0,
        announcements: 5,
        engagement: "92%",
        permissions: p.permissions || {
          clubManagement: true,
          eventManagement: true,
          memberManagement: true,
          announcements: true,
          budgetAccess: true,
          analyticsExport: true,
        },
        joinedDate: p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }) : "Recently",
      };
    });

    return res.status(200).json({
      success: true,
      count: formatted.length,
      presidents: formatted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch presidents.",
    });
  }
};

export const getPresidentById = async (req, res) => {
  try {
    const president = await User.findOne({ _id: req.params.id, role: "president" });
    if (!president) {
      return res.status(404).json({ success: false, message: "Club President not found." });
    }

    const clubs = await Club.find({ president: president._id });
    const assignedClub = clubs[0];

    return res.status(200).json({
      success: true,
      president: {
        id: president._id,
        _id: president._id,
        name: president.name,
        email: president.email,
        studentId: president.studentId || president.enrollmentNumber || "",
        department: president.department || "Computer Science",
        year: president.year || "3rd Year",
        status: president.status || "Active",
        avatar: president.avatar || "",
        clubId: assignedClub?._id || "",
        clubName: assignedClub?.name || "Unassigned",
        clubMembers: assignedClub?.membersCount || 1,
        eventsCreated: assignedClub?.eventsCount || 0,
        announcements: 6,
        engagement: "91%",
        permissions: president.permissions || {
          clubManagement: true,
          eventManagement: true,
          memberManagement: true,
          announcements: true,
          budgetAccess: true,
          analyticsExport: true,
        },
        joinedDate: president.createdAt ? new Date(president.createdAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }) : "Recently",
        recentActivity: [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to load president details.",
    });
  }
};

export const createPresident = async (req, res) => {
  try {
    const { name, email, password, enrollmentNumber, studentId, department, year, clubId } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }

    const enroll = enrollmentNumber || studentId || "PRES-" + Date.now().toString().slice(-4);
    const president = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: "president",
      enrollmentNumber: enroll,
      studentId: enroll,
      department: department || "Computer Science",
      year: year || "3rd Year",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    });

    if (clubId) {
      await Club.findByIdAndUpdate(clubId, { president: president._id });
    }

    await ActivityLog.create({
      title: "President Account Created",
      description: `${president.name} appointed as Club President.`,
      type: "president",
      user: president._id,
    });

    return res.status(201).json({
      success: true,
      message: "Club President account created.",
      president: president.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create president.",
    });
  }
};

export const updatePresident = async (req, res) => {
  try {
    const president = await User.findOne({ _id: req.params.id, role: "president" });
    if (!president) {
      return res.status(404).json({ success: false, message: "President not found." });
    }

    const { name, email, department, year, status, enrollmentNumber, permissions, clubId } = req.body;

    if (name) president.name = name.trim();
    if (email && email.toLowerCase() !== president.email) {
      const existing = await User.findOne({ email: email.toLowerCase(), _id: { $ne: president._id } });
      if (existing) {
        return res.status(409).json({ success: false, message: "Email already taken." });
      }
      president.email = email.toLowerCase().trim();
    }

    if (department) president.department = department;
    if (year) president.year = year;
    if (status) president.status = status;
    if (enrollmentNumber) {
      president.enrollmentNumber = enrollmentNumber;
      president.studentId = enrollmentNumber;
    }
    if (permissions) {
      president.permissions = { ...president.permissions, ...permissions };
    }

    await president.save();

    if (clubId) {
      await Club.findByIdAndUpdate(clubId, { president: president._id });
    }

    return res.status(200).json({
      success: true,
      message: "President updated successfully.",
      president: president.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update president.",
    });
  }
};

export const deletePresident = async (req, res) => {
  try {
    const president = await User.findOne({ _id: req.params.id, role: "president" });
    if (!president) {
      return res.status(404).json({ success: false, message: "President not found." });
    }

    // Check if clubs are owned by this president
    const ownedClubs = await Club.find({ president: president._id });
    if (ownedClubs.length > 0) {
      // Reassign to admin user or mark status
      const adminUser = await User.findOne({ role: "admin" });
      if (adminUser) {
        await Club.updateMany({ president: president._id }, { president: adminUser._id });
      }
    }

    await User.findByIdAndDelete(president._id);

    await ActivityLog.create({
      title: "President Account Removed",
      description: `${president.name} president account was removed.`,
      type: "alert",
    });

    return res.status(200).json({
      success: true,
      message: "President removed successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete president.",
    });
  }
};

// ----------------- REQUESTS MANAGEMENT -----------------

export const getAllRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== "all") {
      filter.status = status;
    }

    const requests = await MembershipRequest.find(filter)
      .populate("student", "name email department year studentId enrollmentNumber avatar")
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
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch requests.",
    });
  }
};
