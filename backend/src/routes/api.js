const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const studentRoutes = require("./studentRoutes");
const opportunityRoutes = require("./opportunityRoutes");
const industryRoutes = require("./industryRoutes");
const collegeRoutes = require("./collegeRoutes");
const facultyRoutes = require("./facultyRoutes");
const notificationRoutes = require("./notificationRoutes");
const bootstrapController = require("../controllers/bootstrapController");
const { db } = require("../config/database");

// Health check endpoint
router.get("/health", (req, res) => {
  try {
    const userCount = db.prepare("SELECT COUNT(*) c FROM users").get().c;
    return res.json({
      status: "healthy",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        connected: true,
        userCount
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: "unhealthy",
      error: err.message
    });
  }
});

// Bootstrap data endpoint
router.get("/bootstrap", bootstrapController.getBootstrapData);

// Mount feature routers
router.use("/auth", authRoutes);
router.use("/student", studentRoutes);
router.use("/opportunities", opportunityRoutes);
router.use("/industry", industryRoutes);
router.use("/college", collegeRoutes);
router.use("/faculty", facultyRoutes);
router.use("/notifications", notificationRoutes);

module.exports = router;
