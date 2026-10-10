import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student reference is required"],
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: [true, "Club reference is required"],
    },
    role: {
      type: String,
      enum: [
        "General Member",
        "Core Team",
        "Volunteer",
        "Lead Designer",
        "Coordinator",
      ],
      default: "General Member",
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

membershipSchema.index({ student: 1, club: 1 }, { unique: true });

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;
