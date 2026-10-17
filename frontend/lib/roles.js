/**
 * Centralized Role Definitions for Cluvio Platform
 * Exactly FOUR platform roles:
 * 1. STUDENT ("student")
 * 2. CLUB_PRESIDENT ("club_president")
 * 3. COLLEGE_ADMIN ("college_admin")
 * 4. PLATFORM_ADMIN ("platform_admin")
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

export const ROLE_LABELS = {
  [UserRole.STUDENT]: "Student",
  [UserRole.CLUB_PRESIDENT]: "Club President",
  [UserRole.COLLEGE_ADMIN]: "College Admin",
  [UserRole.PLATFORM_ADMIN]: "Platform Admin",
};

export const ROLE_HOME_ROUTES = {
  [UserRole.STUDENT]: "/student",
  [UserRole.CLUB_PRESIDENT]: "/president",
  [UserRole.COLLEGE_ADMIN]: "http://localhost:5173",
  [UserRole.PLATFORM_ADMIN]: "http://localhost:3001",
};
