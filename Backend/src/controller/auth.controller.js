import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || "cluvio_jwt_secret_college_demo_key_2026";
  return jwt.sign({ id }, secret, { expiresIn: "7d" });
};

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      role = "student",
      secretKey,
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

    // Role safety: Public registration allows student, club member, club head, or president
    const validRoles = ["student", "club member", "club head", "president"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified. Role must be 'student', 'club member', or 'club head'.",
      });
    }

    // Secret Key validation for club member and club head
    if (role === "club member" || role === "club head") {
      if (!secretKey || secretKey.trim() !== "admin123") {
        return res.status(400).json({
          success: false,
          message: `Invalid secret key. Secret key 'admin123' is required for ${
            role === "club head" ? "Club Head" : "Club Member"
          }.`,
        });
      }
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
    const existingUser = await User.findOne({ email: email.toLowerCase() });
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
      department: department || (role === "student" ? "Computer Science" : "General"),
      year: year || "1st Year",
      avatar:
        role === "president" || role === "club head"
          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
          : role === "club member"
          ? "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    });

    // Record activity
    try {
      const isLead = role === "president" || role === "club head";
      await ActivityLog.create({
        title: isLead
          ? "New Club Head Registered"
          : role === "club member"
          ? "New Club Member Registered"
          : "New Student Registered",
        description: `${user.name} registered as ${
          isLead ? "Club Head" : role === "club member" ? "Club Member" : "Student"
        } (${user.department})`,
        type: isLead ? "president" : "student",
        user: user._id,
      });
    } catch (e) {
      // Non-blocking log error
    }

    const token = generateToken(user._id);

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
    const { email, password, role, secretKey } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
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
        message: "Your account has been suspended. Please contact the administrator.",
      });
    }

    // Role check if user explicitly selected a role
    if (role) {
      const isLeadCompatible =
        (role === "club head" || role === "president") &&
        (user.role === "club head" || user.role === "president");
      const isMemberCompatible =
        (role === "club member" || role === "student") &&
        (user.role === "club member" || user.role === "student");

      if (role !== user.role && !isLeadCompatible && !isMemberCompatible && user.role !== "admin") {
        return res.status(400).json({
          success: false,
          message: `This account is registered as '${user.role}'. Please select the '${user.role}' role to sign in.`,
        });
      }
    }

    // Secret Key validation for club member and club head
    const targetRole = role || user.role;
    if (targetRole === "club member" || targetRole === "club head") {
      if (!secretKey || secretKey.trim() !== "admin123") {
        return res.status(400).json({
          success: false,
          message: `Invalid secret key. Secret key 'admin123' is required for ${
            targetRole === "club head" ? "Club Head" : "Club Member"
          }.`,
        });
      }
    }

    const token = generateToken(user._id);

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
