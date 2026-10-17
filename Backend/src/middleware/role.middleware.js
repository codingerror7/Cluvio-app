import { isValidRole, ALLOWED_ROLES } from "../constants/roles.js";

/**
 * Role-Based Authorization Middleware
 * Strictly enforces access control for the two valid roles: 'student' and 'club_president'.
 * No aliases, no third roles.
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userRole = req.user.role;

    // Reject users with invalid or deprecated roles
    if (!isValidRole(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Account has an invalid user role.",
      });
    }

    const hasPermission = roles.includes(userRole);

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access requires one of the following roles: ${roles.join(", ")}.`,
      });
    }

    next();
  };
};
