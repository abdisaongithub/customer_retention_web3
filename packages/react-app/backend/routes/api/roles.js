const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const {
    allowedRoles
} = require('../../middlewares/allowedRoles')
const roleController = require('../../controllers/roleController')
const roleValidators = require("../../validators/roleValidators")

// @route   POST /role
// @desc    Fetch all Roles
// @access  PRIVATE
router.post('/', auth, allowedRoles(['guest', 'admin', ]), roleValidators.roleCreateValidator, roleController.create)

// @route   GET /role
// @desc    Fetch a/an Role
// @access  PRIVATE
router.get('/', auth, allowedRoles(['admin', ]), roleController.list)

// @route   GET /role
// @desc    Fetch a/an Role
// @access  PRIVATE
router.get('/:id', auth, allowedRoles(['owner', 'admin', ]), roleController.view)

// @route   PUT /role
// @desc    Update a/an Role
// @access  PRIVATE
router.put('/:id', auth, allowedRoles(['owner', 'admin', ]), roleValidators.roleUpdateValidator, roleController.update)

// @route   DELETE /role
// @desc    Delete a/an Role
// @access  PRIVATE
router.delete('/:id', auth, allowedRoles(['owner', 'admin', ]), roleController.destroy)

module.exports = router