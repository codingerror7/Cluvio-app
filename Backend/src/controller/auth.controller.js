import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";
import { UserRole, ALLOWED_ROLES, isValidRole } from "../constants/roles.js";

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
      age,
      bio,
      favouriteGenres,
      department,
      year,
    } = req.body;

    // Validation
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

    // Role validation: Strictly allow ONLY 'student' and 'club_president'
    if (!isValidRole(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user role. Allowed roles: student, club_president.",
      });
    }

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

    // Determine avatar based on role
    const defaultAvatar =
      role === UserRole.CLUB_PRESIDENT
        ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role,
      enrollmentNumber: enroll || "",
      studentId: enroll || "",
      age: age ? Number(age) : undefined,
      bio: bio ? bio.trim() : "",
      favouriteGenres: Array.isArray(favouriteGenres) ? favouriteGenres : [],
      department: department || (role === UserRole.CLUB_PRESIDENT ? "Robotics & Automation" : "Computer Science"),
      year: year || (role === UserRole.CLUB_PRESIDENT ? "3rd Year" : "1st Year"),
      avatar: defaultAvatar,
      status: "Active",
    });

    // Record activity
    try {
      await ActivityLog.create({
        title: role === UserRole.CLUB_PRESIDENT ? "New Club President Registered" : "New Student Registered",
        description: `${user.name} registered as ${role === UserRole.CLUB_PRESIDENT ? "Club President" : "Student"} (${user.department})`,
        type: role === UserRole.CLUB_PRESIDENT ? "president" : "student",
        user: user._id,
      });
    } catch (e) {
      // Non-blocking log
    }

    const token = generateToken(user._id, user.role);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        enrollmentNumber: user.enrollmentNumber,
        studentId: user.studentId,
        age: user.age,
        bio: user.bio,
        department: user.department,
        year: user.year,
        favouriteGenres: user.favouriteGenres,
        avatar: user.avatar,
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

    // Role validation if role is specified in login request
    if (role && !isValidRole(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user role. Allowed roles: student, club_president.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
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
        message: "Your account has been suspended. Please contact campus authority.",
      });
    }

    // Role safety check: Ensure user role matches selected role portal
    if (role && user.role !== role) {
      const friendlyCurrentRole = user.role === UserRole.CLUB_PRESIDENT ? "Club President" : "Student";
      const friendlySelectedRole = role === UserRole.CLUB_PRESIDENT ? "Club President" : "Student";
      return res.status(400).json({
        success: false,
        message: `This account is registered as ${friendlyCurrentRole}. Please select the ${friendlyCurrentRole} portal to sign in.`,
      });
    }

    const token = generateToken(user._id, user.role);

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
        enrollmentNumber: user.enrollmentNumber,
        studentId: user.studentId,
        age: user.age,
        bio: user.bio,
        department: user.department,
        year: user.year,
        favouriteGenres: user.favouriteGenres,
        avatar: user.avatar,
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

export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve user profile.",
    });
  }
};
