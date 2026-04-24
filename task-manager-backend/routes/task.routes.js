const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const authMiddleware = require("../middleware/auth.middleware");

const { body } = require("express-validator");

// Create Task with validation
router.post(
  "/",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
  ],
  createTask
);

router.get("/", authMiddleware, getTasks);

router.put("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;

