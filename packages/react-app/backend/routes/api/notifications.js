const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const {
    allowedRoles
} = require('../../middlewares/allowedRoles')
const notificationController = require('../../controllers/notificationController')
const notificationValidators = require("../../validators/notificationValidators")

// @route   POST notification
// @desc    Fetch all Notifications
// @access  PRIVATE
router.post('/', auth, allowedRoles(['admin', ]), notificationValidators.notificationCreateValidator, notificationController.create)

// @route   GET notification
// @desc    Fetch a/an Notification
// @access  PRIVATE
router.get('/', auth, allowedRoles(['admin', 'client', 'nexusers', ]), notificationController.list)

// @route   GET notification
// @desc    Fetch a/an Notification
// @access  PRIVATE
router.get('/:id', auth, allowedRoles(['admin', 'client', 'nexusers', ]), notificationController.view)

// @route   DELETE notification
// @desc    Delete a/an Notification
// @access  PRIVATE
router.delete('/:id', auth, allowedRoles(['admin', ]), notificationController.destroy)

// @route   POST notification
// @desc    Turn To True read
// @access  PRIVATE
router.post('/:id/turnToTrueRead', auth, allowedRoles(['guest', 'admin', 'client', 'nexusers', ]), notificationController.turnToTrueRead)

module.exports = router