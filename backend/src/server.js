require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const { db } = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (!req.path.startsWith("/static")) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// API Routes
app.use("/api", apiRoutes);

// Serve static frontend assets from public/
const publicDir = path.resolve(__dirname, "../../public");
app.use(express.static(publicDir));

// Fallback for SPA routing - serve index.html for unknown non-API routes
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ success: false, message: "API endpoint not found" });
  }
  res.sendFile(path.join(publicDir, "index.html"), (err) => {
    if (err) {
      next(err);
    }
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// Start listening if run directly
let server;
if (require.main === module) {
  server = app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Sangam Collaboration Portal Server is running!`);
    console.log(`📍 Web Interface: http://localhost:${PORT}`);
    console.log(`📡 Health Check:  http://localhost:${PORT}/api/health`);
    console.log(`🔄 Bootstrap API: http://localhost:${PORT}/api/bootstrap`);
    console.log(`📁 Environment:   ${process.env.NODE_ENV || "development"}`);
    console.log(`====================================================`);
  });

  // Graceful shutdown
  const handleShutdown = (signal) => {
    console.log(`\nReceived ${signal}. Closing server gracefully...`);
    if (server) {
      server.close(() => {
        console.log("HTTP server closed.");
        try {
          db.close();
          console.log("Database connection closed.");
        } catch (e) {
          console.error("Error closing database:", e);
        }
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  };

  process.on("SIGINT", () => handleShutdown("SIGINT"));
  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
}

module.exports = { app, server };
