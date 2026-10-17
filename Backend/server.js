import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.config.js";

import authRoutes from "./src/routes/auth.routes.js";
import studentsRoutes from "./src/routes/students.routes.js";
import presidentsRoutes from "./src/routes/presidents.routes.js";
import clubsRoutes from "./src/routes/clubs.routes.js";
import membershipsRoutes from "./src/routes/memberships.routes.js";
import eventsRoutes from "./src/routes/events.routes.js";
import activitiesRoutes from "./src/routes/activities.routes.js";
import announcementsRoutes from "./src/routes/announcements.routes.js";
import notificationsRoutes from "./src/routes/notifications.routes.js";
import approvalsRoutes from "./src/routes/approvals.routes.js";
import collegeAdminRoutes from "./src/routes/collegeAdmin.routes.js";
import platformAdminRoutes from "./src/routes/platformAdmin.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import requestsRoutes from "./src/routes/requests.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Primary Clean API Routes per Architecture Specification
app.use("/api/auth", authRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/presidents", presidentsRoutes);
app.use("/api/clubs", clubsRoutes);
app.use("/api/memberships", membershipsRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/announcements", announcementsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/approvals", approvalsRoutes);
app.use("/api/college-admin", collegeAdminRoutes);
app.use("/api/platform-admin", platformAdminRoutes);

// Compatibility Routes
app.use("/api/admin", adminRoutes);
app.use("/api/requests", requestsRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error occurred.",
  });
});

// Start Server
app.listen(PORT, async () => {
  console.log(`Cluvio Backend server running on port ${PORT}`);
  await connectDB();
});