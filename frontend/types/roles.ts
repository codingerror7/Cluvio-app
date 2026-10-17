/**
 * Type definitions for BroClubs two-role architecture
 */

export type Role = "student" | "club_president";

export enum UserRoleEnum {
  STUDENT = "student",
  CLUB_PRESIDENT = "club_president",
}

export interface AuthenticatedUser {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
  year?: string;
  studentId?: string;
  avatar?: string;
}
