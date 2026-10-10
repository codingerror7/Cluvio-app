import mongoose from "mongoose";

const membershipRequestSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
      required: true,
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    reviewDate: {
      type: Date,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate active or pending requests
membershipRequestSchema.index({ student: 1, club: 1, status: 1 });

const MembershipRequest = mongoose.model("MembershipRequest", membershipRequestSchema);
export default MembershipRequest;
