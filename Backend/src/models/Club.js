import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Club name is required"],
      trim: true,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: [true, "College reference is required"],
    },
    collegeName: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Technical",
        "Cultural",
        "Sports",
        "Literary",
        "Entrepreneurship",
        "Social",
        "Creative",
        "Engineering",
        "Other",
      ],
      default: "Technical",
      required: true,
    },
    sector: {
      type: String,
      default: "Technical & Innovation",
    },
    tags: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: "💻",
    },
    president: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Club must have a president assigned"],
    },
    objectives: {
      type: String,
      default: "",
    },
    activities: {
      type: String,
      default: "",
    },
    meetingSchedule: {
      type: String,
      default: "Weekly meetups",
    },
    budgetAllocated: {
      type: Number,
      default: 25000,
    },
    budgetSpent: {
      type: Number,
      default: 5000,
    },
    engagementRate: {
      type: Number,
      default: 85,
    },
    eventsCount: {
      type: Number,
      default: 0,
    },
    maxMembers: {
      type: Number,
      default: 500,
    },
    membersCount: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Rejected", "Inactive", "Suspended", "Archived"],
      default: "Pending",
    },
    rejectionReason: {
      type: String,
      default: "",
    },
    pendingChanges: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    recruitmentOpen: {
      type: Boolean,
      default: true,
    },
    hiringDomains: {
      type: [String],
      default: [
        "Technical & Coding",
        "Design & UI/UX",
        "PR & Social Media",
        "Operations & Logistics",
        "Content & Editorial",
      ],
    },
    deletedAt: {
      type: Date,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: {
      type: Date,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    announcements: [
      {
        title: { type: String, required: true },
        message: { type: String, required: true },
        priority: {
          type: String,
          enum: ["Normal", "High", "Urgent"],
          default: "Normal",
        },
        date: { type: String, default: () => new Date().toLocaleDateString("en-GB") },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    leadership: [
      {
        name: { type: String, required: true },
        role: { type: String, default: "Executive Member" },
        email: { type: String },
        avatar: { type: String },
      },
    ],
    recentEvents: [
      {
        title: { type: String, required: true },
        date: { type: String },
        time: { type: String },
        attendees: { type: Number, default: 0 },
        status: {
          type: String,
          enum: ["Completed", "Upcoming", "In Progress"],
          default: "Upcoming",
        },
        location: { type: String, default: "Campus Auditorium" },
        description: { type: String, default: "" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

clubSchema.index({ name: 1, college: 1 }, { unique: true });

const Club = mongoose.model("Club", clubSchema);
export default Club;
