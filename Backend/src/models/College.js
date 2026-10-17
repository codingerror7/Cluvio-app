import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "College name is required"],
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: [true, "College code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    adminEmail: {
      type: String,
      lowercase: true,
      trim: true,
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

const College = mongoose.model("College", collegeSchema);
export default College;
