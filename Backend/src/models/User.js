import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["student", "club member", "club head", "president", "admin"],
      default: "student",
      required: true,
    },
    enrollmentNumber: {
      type: String,
      trim: true,
      default: "",
    },
    studentId: {
      type: String,
      trim: true,
      default: "",
    },
    age: {
      type: Number,
      min: 16,
      max: 100,
    },
    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },
    department: {
      type: String,
      default: "Computer Science",
    },
    year: {
      type: String,
      default: "1st Year",
    },
    favouriteGenres: {
      type: [String],
      default: [],
    },
    avatar: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended", "Pending"],
      default: "Active",
    },
    permissions: {
      clubManagement: { type: Boolean, default: true },
      eventManagement: { type: Boolean, default: true },
      memberManagement: { type: Boolean, default: true },
      announcements: { type: Boolean, default: true },
      budgetAccess: { type: Boolean, default: false },
      analyticsExport: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

// Synchronize studentId with enrollmentNumber if not provided
userSchema.pre("save", async function () {
  if (this.enrollmentNumber && !this.studentId) {
    this.studentId = this.enrollmentNumber;
  } else if (this.studentId && !this.enrollmentNumber) {
    this.enrollmentNumber = this.studentId;
  }

  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON response
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model("User", userSchema);
export default User;
