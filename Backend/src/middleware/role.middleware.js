import { isValidRole } from "../constants/roles.js";

/**
 * Role-Based Access Control Middleware
 * Supports: 'student', 'club_president', 'college_admin', 'platform_admin'
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
