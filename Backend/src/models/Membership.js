import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: [true, "College reference is required"],
    },
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
      default: "General Member",
    },
    status: {
      type: String,
      enum: ["Pending", "Active", "Rejected", "Cancelled"],
      default: "Pending",
    },
    rejectionReason: {
      type: String,
      default: "",
    },
    motivation: {
      type: String,
      default: "",
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    approvedAt: {
      type: Date,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

membershipSchema.index({ student: 1, club: 1 }, { unique: true });
membershipSchema.index({ college: 1, status: 1 });

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;
