import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Club name is required"],
      unique: true,
      trim: true,
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
      enum: ["Active", "Pending", "Inactive", "Suspended"],
      default: "Active",
    },
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Club = mongoose.model("Club", clubSchema);
export default Club;
