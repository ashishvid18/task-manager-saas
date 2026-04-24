const Task = require("../models/task.model");
const { validationResult } = require("express-validator");
const asyncHandler = require("../utils/asyncHandler");

// Create Task
exports.createTask = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Validation failed");
    err.status = 400;
    throw err;
  }

  const { title, description } = req.body;

  const task = await Task.create({
    title,
    description,
    userId: req.user.id,
  });

  res.status(201).json(task);
});

// Get Tasks
exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.findAll({
    where: { userId: req.user.id },
  });

  res.json(tasks);
});

// Update Task
exports.updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    where: { id: req.params.id, userId: req.user.id },
  });

  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }

  task.status = req.body.status || task.status;
  await task.save();

  res.json(task);
});

// Delete Task
exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    where: { id: req.params.id, userId: req.user.id },
  });

  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }

  await task.destroy();

  res.json({ message: "Task deleted" });
});
