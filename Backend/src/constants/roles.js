/**
 * Centralized User Role Definitions for BroClubs
 * Exactly TWO roles: STUDENT and CLUB_PRESIDENT
 */

export const UserRole = {
  STUDENT: "student",
  CLUB_PRESIDENT: "club_president",
};

export const ALLOWED_ROLES = Object.freeze([
  UserRole.STUDENT,
  UserRole.CLUB_PRESIDENT,
]);

export const isValidRole = (role) => {
  return typeof role === "string" && ALLOWED_ROLES.includes(role);
};
