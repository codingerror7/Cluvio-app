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
      enum: ["Pending", "Interview Scheduled", "Approved", "Rejected"],
      default: "Pending",
      required: true,
    },
    preferredDomain: {
      type: String,
      default: "Technical & Coding",
    },
    skills: {
      type: [String],
      default: [],
    },
    motivation: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
    availabilityHours: {
      type: String,
      default: "3-5 hrs/week",
    },
    portfolioUrl: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      default: "",
    },
    interviewDetails: {
      date: { type: String, default: "" },
      time: { type: String, default: "" },
      venueOrLink: { type: String, default: "" },
      instructions: { type: String, default: "" },
    },
    rejectionReason: {
      type: String,
      default: "",
    },
    feedback: {
      type: String,
      default: "",
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
  },
  {
    timestamps: true,
  }
);

// Index to quickly search student and club requests
membershipRequestSchema.index({ student: 1, club: 1, status: 1 });

const MembershipRequest = mongoose.model(
  "MembershipRequest",
  membershipRequestSchema
);
export default MembershipRequest;
