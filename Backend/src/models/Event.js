import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      default: "10:00 AM",
    },
    endTime: {
      type: String,
      default: "1:00 PM",
    },
    location: {
      type: String,
      default: "Campus Auditorium",
    },
    capacity: {
      type: Number,
      default: 100,
    },
    attendeesCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Cancelled"],
      default: "Pending",
    },
    rejectionReason: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ college: 1, status: 1 });
eventSchema.index({ club: 1 });

const Event = mongoose.model("Event", eventSchema);
export default Event;
