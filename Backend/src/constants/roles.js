/**
 * Centralized User Role Definitions for Cluvio Platform
 * Exactly FOUR platform roles:
 * - STUDENT
 * - CLUB_PRESIDENT
 * - COLLEGE_ADMIN
 * - PLATFORM_ADMIN
 */

export const UserRole = {
  STUDENT: "student",
  CLUB_PRESIDENT: "club_president",
  COLLEGE_ADMIN: "college_admin",
  PLATFORM_ADMIN: "platform_admin",
};

export const ALLOWED_ROLES = Object.freeze([
  UserRole.STUDENT,
  UserRole.CLUB_PRESIDENT,
  UserRole.COLLEGE_ADMIN,
  UserRole.PLATFORM_ADMIN,
]);

export const isValidRole = (role) => {
  return typeof role === "string" && ALLOWED_ROLES.includes(role);
};
