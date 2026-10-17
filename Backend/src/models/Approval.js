import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema(
  {
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: [true, "College is required for tenant isolation"],
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Requester is required"],
    },
    actionType: {
      type: String,
      enum: [
        "PROFILE_CREATE",
        "PROFILE_UPDATE",
        "PRESIDENT_ACTIVATION",
        "CLUB_CREATE",
        "CLUB_UPDATE",
        "CLUB_DELETE",
        "MEMBERSHIP_REQUEST",
        "MEMBERSHIP_CANCEL",
        "EVENT_CREATE",
        "EVENT_UPDATE",
        "EVENT_DELETE",
        "ACTIVITY_CREATE",
        "ACTIVITY_UPDATE",
        "ACTIVITY_DELETE",
        "ANNOUNCEMENT_CREATE",
        "ANNOUNCEMENT_UPDATE",
        "ANNOUNCEMENT_DELETE",
      ],
      required: [true, "Action type is required"],
    },
    resourceType: {
      type: String,
      enum: ["User", "Club", "Membership", "Event", "Activity", "Announcement"],
      required: [true, "Resource type is required"],
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Resource ID is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    reason: {
      type: String,
      default: "",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: {
      type: Date,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

approvalSchema.index({ college: 1, status: 1 });
approvalSchema.index({ resourceId: 1, actionType: 1 });

const Approval = mongoose.model("Approval", approvalSchema);
export default Approval;
