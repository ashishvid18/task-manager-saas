const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// Middlewares
app.use(cors({
  origin: [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:5174"].filter(Boolean),
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware (MUST be last)
app.use(errorHandler);

module.exports = app;
