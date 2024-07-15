const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const { allowedRoles } = require("../../middlewares/allowedRoles");
const taskController = require("../../controllers/taskController");
const taskValidators = require("../../validators/taskValidators");

// @route   POST task
// @desc    Fetch all Tasks
// @access  PRIVATE
router.post(
  "/",
  auth,
  allowedRoles(["admin", "client"]),
  taskValidators.taskCreateValidator,
  taskController.create
);

// @route   GET task
// @desc    Fetch a/an Task
// @access  PRIVATE
router.get(
  "/",
  auth,
  allowedRoles(["admin", "client", "nexusers"]),
  taskController.list
);

// @route   GET task
// @desc    Fetch a/an Task
// @access  PRIVATE
router.get(
  "/:id",
  auth,
  allowedRoles(["admin", "client", "nexusers"]),
  taskController.view
);

// @route   PUT task
// @desc    Update a/an Task
// @access  PRIVATE
router.put(
  "/:id",
  auth,
  allowedRoles(["admin", "client"]),
  taskValidators.taskUpdateValidator,
  taskController.update
);

// @route   DELETE task
// @desc    Delete a/an Task
// @access  PRIVATE
router.delete(
  "/:id",
  auth,
  allowedRoles(["admin", "client"]),
  taskController.destroy
);

module.exports = router;
