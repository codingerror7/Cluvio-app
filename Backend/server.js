import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.config.js";

import authRoutes from "./src/routes/auth.routes.js";
import usersRoutes from "./src/routes/users.routes.js";
import clubsRoutes from "./src/routes/clubs.routes.js";
import requestsRoutes from "./src/routes/requests.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";

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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/clubs", clubsRoutes);
app.use("/api/requests", requestsRoutes);
app.use("/api/admin", adminRoutes);

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