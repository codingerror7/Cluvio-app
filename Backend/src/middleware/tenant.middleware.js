import { UserRole } from "../constants/roles.js";

/**
 * Tenant Isolation Middleware
 * Enforces that non-platform administrators are strictly locked to their assigned college.
 */
export const requireTenant = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  // Platform admin is cross-tenant
  if (req.user.role === UserRole.PLATFORM_ADMIN) {
    req.collegeId = req.query.collegeId || req.body.collegeId || null;
    return next();
  }

  const collegeId = req.user.college?._id || req.user.college;
  if (!collegeId) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: User is not associated with any college tenant.",
    });
  }

  req.collegeId = collegeId;
  next();
};

/**
 * Validates that a target resource belongs to the requesting user's college.
 * Platform admin can bypass this check.
 */
export const verifyTenantAccess = (resourceCollegeId, req) => {
  if (req.user?.role === UserRole.PLATFORM_ADMIN) {
    return true;
  }

  const userCollegeId = (req.user?.college?._id || req.user?.college)?.toString();
  const targetCollegeId = (resourceCollegeId?._id || resourceCollegeId)?.toString();

  return Boolean(userCollegeId && targetCollegeId && userCollegeId === targetCollegeId);
};
