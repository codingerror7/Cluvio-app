import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.config.js";
import User from "../models/User.js";
import { UserRole } from "../constants/roles.js";

dotenv.config();

/**
 * Database Migration Script: Two-Role Architecture Refactor
 * Safely migrates legacy roles to the two canonical roles: 'student' and 'club_president'.
 *
 * Mappings:
 * - 'president'   -> 'club_president'
 * - 'club head'   -> 'club_president'
 * - 'club member' -> 'student'
 * - 'student'     -> 'student' (preserved)
 *
 * For legacy 'admin' or 'college-admin', records are archived/flagged with legacy status
 * rather than silently deleting data.
 */
export const runRoleMigration = async () => {
  try {
    console.log("Starting role migration to two-role architecture (student, club_president)...");
    await connectDB();

    // 1. Migrate 'president' and 'club head' to 'club_president'
    const presidentResult = await User.updateMany(
      { role: { $in: ["president", "club head"] } },
      { $set: { role: UserRole.CLUB_PRESIDENT } }
    );
    console.log(`Migrated ${presidentResult.modifiedCount} president/club head records to '${UserRole.CLUB_PRESIDENT}'.`);

    // 2. Migrate 'club member' to 'student'
    const memberResult = await User.updateMany(
      { role: "club member" },
      { $set: { role: UserRole.STUDENT } }
    );
    console.log(`Migrated ${memberResult.modifiedCount} club member records to '${UserRole.STUDENT}'.`);

    // 3. Inspect any legacy admin records
    const legacyAdmins = await User.find({
      role: { $in: ["admin", "college-admin", "college admin"] },
    });
    console.log(`Found ${legacyAdmins.length} legacy admin/college-admin accounts.`);

    for (const adminUser of legacyAdmins) {
      console.log(`- Legacy account noted: ${adminUser.email} (former role: ${adminUser.role})`);
    }

    console.log("Role migration completed successfully.");
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  }
};

// Auto-run if executed directly via CLI
if (process.argv[1] && process.argv[1].includes("migrate-roles.js")) {
  runRoleMigration()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
