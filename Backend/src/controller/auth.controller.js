import jwt from "jsonwebtoken";
import User from "../models/User.js";
import College from "../models/College.js";
import PresidentCode from "../models/PresidentCode.js";
import Approval from "../models/Approval.js";
import Notification from "../models/Notification.js";
import AuditLog from "../models/AuditLog.js";
import { UserRole, isValidRole } from "../constants/roles.js";

const generateToken = (id, role) => {
  const secret = process.env.JWT_SECRET || "cluvio_jwt_secret_college_demo_key_2026";
  return jwt.sign({ id, role }, secret, { expiresIn: "30d" });
};

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      role = UserRole.STUDENT,
      enrollmentNumber,
      studentId,
      collegeId,
      collegeName,
      collegeCode,
      department,
      course,
      year,
      phone,
      bio,
      avatar,
      favouriteGenres,
    } = req.body;

    // Basic Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, and password are required.",
      });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirmation password do not match.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    // Role Escalation Prevention: Public registration cannot self-promote to admin or president
    if (role === UserRole.COLLEGE_ADMIN || role === UserRole.PLATFORM_ADMIN) {
      return res.status(403).json({
        success: false,
        message: "Administrative accounts cannot be self-registered through the public portal.",
      });
    }

    if (role === UserRole.CLUB_PRESIDENT) {
      return res.status(403).json({
        success: false,
        message: "Club Presidents must activate via College Admin 6-digit President Code.",
      });
    }

    const assignedRole = UserRole.STUDENT;

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Check duplicate email
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email address already exists.",
      });
    }

    // Check duplicate enrollment number if provided
    const enroll = enrollmentNumber || studentId;
    if (enroll) {
      const existingEnroll = await User.findOne({
        $or: [{ enrollmentNumber: enroll }, { studentId: enroll }],
      });
      if (existingEnroll) {
        return res.status(409).json({
          success: false,
          message: "An account with this enrollment number already exists.",
        });
      }
    }

    // Resolve College
    let targetCollege = null;
    if (collegeId) {
      targetCollege = await College.findById(collegeId);
    } else if (collegeCode) {
      targetCollege = await College.findOne({ code: collegeCode.toUpperCase().trim() });
    } else if (collegeName) {
      targetCollege = await College.findOne({ name: { $regex: collegeName.trim(), $options: "i" } });
    }

    // Fallback to first active college if none provided
    if (!targetCollege) {
      targetCollege = await College.findOne({ status: "Active" });
    }

    if (!targetCollege) {
      targetCollege = await College.create({
        name: collegeName || "Delhi Technological University (DTU)",
        code: collegeCode || "DTU",
        status: "Active",
      });
    }

    const selectedAvatar = avatar || "/avatars/avatar-1.svg";

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: assignedRole,
      college: targetCollege._id,
      collegeName: targetCollege.name,
      collegeCode: targetCollege.code,
      enrollmentNumber: enroll || "",
      studentId: enroll || "",
      department: department || "Computer Science",
      course: course || "B.Tech",
      year: year || "1st Year",
      phone: phone || "",
      bio: bio ? bio.trim() : "",
      avatar: selectedAvatar,
      favouriteGenres: Array.isArray(favouriteGenres) ? favouriteGenres : ["Technical"],
      profileStatus: "Pending",
      status: "Active",
    });

    // Create approval item for college admin review
    const approval = await Approval.create({
      college: targetCollege._id,
      requestedBy: user._id,
      actionType: "PROFILE_CREATE",
      resourceType: "User",
      resourceId: user._id,
      status: "Pending",
      metadata: {
        name: user.name,
        email: user.email,
        enrollmentNumber: user.enrollmentNumber,
        department: user.department,
        year: user.year,
        avatar: user.avatar,
      },
    });

    // Notify College Admin(s)
    const collegeAdmins = await User.find({
      college: targetCollege._id,
      role: UserRole.COLLEGE_ADMIN,
    });

    for (const admin of collegeAdmins) {
      await Notification.create({
        recipient: admin._id,
        college: targetCollege._id,
        title: "New Student Profile Registration",
        message: `${user.name} (${user.enrollmentNumber || user.email}) registered and submitted their profile for approval.`,
        type: "approval",
        relatedResource: {
          resourceType: "User",
          resourceId: user._id,
        },
      });
    }

    // Audit Log
    await AuditLog.create({
      actorId: user._id,
      actorName: user.name,
      actorEmail: user.email,
      actorRole: user.role,
      college: targetCollege._id,
      collegeName: targetCollege.name,
      action: "STUDENT_REGISTERED",
      title: "New Student Registered",
      description: `${user.name} registered and submitted profile pending College Admin review.`,
      resourceType: "User",
      resourceId: user._id,
      type: "student",
      status: "Pending",
    });

    const token = generateToken(user._id, user.role);

    return res.status(201).json({
      success: true,
      message: "Registration successful. Profile submitted for College Admin approval.",
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        college: targetCollege,
        collegeName: targetCollege.name,
        collegeCode: targetCollege.code,
        enrollmentNumber: user.enrollmentNumber,
        studentId: user.studentId,
        department: user.department,
        course: user.course,
        year: user.year,
        phone: user.phone,
        bio: user.bio,
        avatar: user.avatar,
        profileStatus: user.profileStatus,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error during registration.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).populate("college");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (user.status === "Suspended") {
      return res.status(403).json({
        success: false,
        message: "Your account has been suspended. Please contact your college administrator.",
      });
    }

    // Role safety check
    if (role && user.role !== role) {
      return res.status(400).json({
        success: false,
        message: `Account is registered as ${user.role}. Please use the corresponding portal.`,
      });
    }

    const token = generateToken(user._id, user.role);

    await AuditLog.create({
      actorId: user._id,
      actorName: user.name,
      actorEmail: user.email,
      actorRole: user.role,
      college: user.college?._id,
      collegeName: user.college?.name || user.collegeName,
      action: "USER_LOGIN",
      title: "User Signed In",
      description: `${user.name} logged in successfully as ${user.role}.`,
      resourceType: "User",
      resourceId: user._id,
      type: "auth",
      status: "Success",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        college: user.college,
        collegeName: user.college?.name || user.collegeName,
        collegeCode: user.college?.code || user.collegeCode,
        enrollmentNumber: user.enrollmentNumber,
        studentId: user.studentId,
        department: user.department,
        course: user.course,
        year: user.year,
        phone: user.phone,
        bio: user.bio,
        avatar: user.avatar,
        profileStatus: user.profileStatus,
        profileRejectionReason: user.profileRejectionReason,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error during login.",
    });
  }
};

/**
 * President Authentication via 6-digit Code
 * Inputs: email, enrollmentNumber, code
 */
export const presidentLogin = async (req, res) => {
  try {
    const { email, enrollmentNumber, code, password } = req.body;

    if (!email || !enrollmentNumber || !code) {
      return res.status(400).json({
        success: false,
        message: "Email, enrollment number, and 6-digit President Code are required.",
      });
    }

    const cleanCode = code.toString().trim();
    if (cleanCode.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "President Code must be exactly 6 digits.",
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanEnroll = enrollmentNumber.trim();

    // Verify 6-digit President Code in DB
    const presCodeDoc = await PresidentCode.findOne({
      code: cleanCode,
      assignedEmail: cleanEmail,
      assignedEnrollment: cleanEnroll,
      status: "Active",
    }).populate("college");

    if (!presCodeDoc) {
      return res.status(401).json({
        success: false,
        message: "Invalid or inactive President Code. Please verify your credentials or contact your College Admin.",
      });
    }

    if (presCodeDoc.expiresAt && new Date() > new Date(presCodeDoc.expiresAt)) {
      presCodeDoc.status = "Expired";
      await presCodeDoc.save();
      return res.status(403).json({
        success: false,
        message: "This President Code has expired. Please request a new code from your College Admin.",
      });
    }

    // Find or initialize User
    let user = await User.findOne({
      $or: [{ email: cleanEmail }, { enrollmentNumber: cleanEnroll }],
    }).populate("college");

    if (!user) {
      user = await User.create({
        name: cleanEmail.split("@")[0].replace(".", " "),
        email: cleanEmail,
        password: password || "President@123",
        role: UserRole.CLUB_PRESIDENT,
        college: presCodeDoc.college._id,
        collegeName: presCodeDoc.college.name,
        collegeCode: presCodeDoc.college.code,
        enrollmentNumber: cleanEnroll,
        studentId: cleanEnroll,
        department: "Robotics & Automation",
        course: "B.Tech",
        year: "3rd Year",
        avatar: "/avatars/avatar-2.svg",
        profileStatus: "Approved",
        status: "Active",
      });
    } else {
      user.role = UserRole.CLUB_PRESIDENT;
      user.college = presCodeDoc.college._id;
      user.collegeName = presCodeDoc.college.name;
      user.collegeCode = presCodeDoc.college.code;
      if (password) {
        user.password = password;
      }
      await user.save();
    }

    // Mark code as Used
    presCodeDoc.status = "Used";
    presCodeDoc.usedAt = new Date();
    presCodeDoc.assignedStudent = user._id;
    await presCodeDoc.save();

    // Audit Log
    await AuditLog.create({
      actorId: user._id,
      actorName: user.name,
      actorEmail: user.email,
      actorRole: UserRole.CLUB_PRESIDENT,
      college: presCodeDoc.college._id,
      collegeName: presCodeDoc.college.name,
      action: "PRESIDENT_ACTIVATED",
      title: "President Code Activated",
      description: `${user.name} activated club president account using code ${cleanCode}.`,
      resourceType: "PresidentCode",
      resourceId: presCodeDoc._id,
      type: "president",
      status: "Success",
    });

    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: "Club President authenticated and activated successfully.",
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        college: presCodeDoc.college,
        collegeName: presCodeDoc.college.name,
        collegeCode: presCodeDoc.college.code,
        enrollmentNumber: user.enrollmentNumber,
        studentId: user.studentId,
        department: user.department,
        course: user.course,
        year: user.year,
        phone: user.phone,
        bio: user.bio,
        avatar: user.avatar,
        profileStatus: user.profileStatus,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("President login error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to authenticate president code.",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").populate("college");
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve user profile.",
    });
  }
};

export const getColleges = async (req, res) => {
  try {
    const colleges = await College.find({ status: "Active" }).sort({ name: 1 });
    return res.status(200).json({
      success: true,
      colleges,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch colleges.",
    });
  }
};
