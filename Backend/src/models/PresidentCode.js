import mongoose from "mongoose";

const presidentCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "6-digit code is required"],
      trim: true,
      minlength: 6,
      maxlength: 6,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: [true, "College is required for tenant isolation"],
    },
    assignedStudent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignedEmail: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Assigned email is required"],
    },
    assignedEnrollment: {
      type: String,
      trim: true,
      required: [true, "Assigned enrollment number is required"],
    },
    targetClubName: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Used", "Revoked", "Expired"],
      default: "Active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    usedAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

presidentCodeSchema.index({ code: 1, college: 1 });
presidentCodeSchema.index({ assignedEmail: 1, assignedEnrollment: 1, college: 1 });

const PresidentCode = mongoose.model("PresidentCode", presidentCodeSchema);
export default PresidentCode;
