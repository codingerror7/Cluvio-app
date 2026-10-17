/**
 * Centralized Role Definition for BroClubs Frontend
 * The system supports strictly TWO user roles:
 * 1. STUDENT ("student")
 * 2. CLUB_PRESIDENT ("club_president")
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

export const ROLE_LABELS = {
  [UserRole.STUDENT]: "Student",
  [UserRole.CLUB_PRESIDENT]: "Club President",
};

export const ROLE_HOME_ROUTES = {
  [UserRole.STUDENT]: "/student",
  [UserRole.CLUB_PRESIDENT]: "/president",
};
