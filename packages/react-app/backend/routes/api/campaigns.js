const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const { allowedRoles } = require("../../middlewares/allowedRoles");
const campaignController = require("../../controllers/campaignController");
const campaignValidators = require("../../validators/campaignValidators");

// @route   POST campaign
// @desc    Fetch all Campaigns
// @access  PRIVATE
router.post(
  "/",
  auth,
  allowedRoles(["admin", "client"]),
  campaignValidators.campaignCreateValidator,
  campaignController.create
);

// @route   GET campaign
// @desc    Fetch a/an Campaign
// @access  PRIVATE
router.get(
  "/",
  auth,
  allowedRoles(["admin", "client", "nexusers"]),
  campaignController.list
);

// @route   GET campaign
// @desc    Fetch a/an Campaign
// @access  PRIVATE
router.get(
  "/:id",
  auth,
  allowedRoles(["admin", "client", "nexusers"]),
  campaignController.view
);

// @route   PUT campaign
// @desc    Update a/an Campaign
// @access  PRIVATE
router.put(
  "/:id",
  auth,
  allowedRoles(["admin", "client"]),
  campaignValidators.campaignUpdateValidator,
  campaignController.update
);

// @route   DELETE campaign
// @desc    Delete a/an Campaign
// @access  PRIVATE
router.delete(
  "/:id",
  auth,
  allowedRoles(["admin", "client"]),
  campaignController.destroy
);

// @route   POST campaign
// @desc    Toggle verified
// @access  PRIVATE
router.post(
  "/:id/toggleVerified",
  auth,
  allowedRoles(["admin", "client"]),
  campaignController.toggleVerified
);

module.exports = router;
