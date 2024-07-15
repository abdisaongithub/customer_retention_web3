const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const {
    allowedRoles
} = require('../../middlewares/allowedRoles')
const userController = require('../../controllers/userController')
const userValidators = require("../../validators/userValidators")

// @route   POST /user
// @desc    Fetch all Users
// @access  PRIVATE
router.post('/', auth, allowedRoles(['admin', ]), userValidators.userCreateValidator, userController.create)

// @route   GET /user
// @desc    Fetch a/an User
// @access  PRIVATE
router.get('/', auth, allowedRoles(['admin', ]), userController.list)

// @route   GET /user
// @desc    Fetch a/an User
// @access  PRIVATE
router.get('/:id', auth, allowedRoles(['owner', 'admin', ]), userController.view)

// @route   PUT /user
// @desc    Update a/an User
// @access  PRIVATE
router.put('/:id', auth, allowedRoles(['owner', 'admin', ]), userValidators.userUpdateValidator, userController.update)

// @route   DELETE /user
// @desc    Delete a/an User
// @access  PRIVATE
router.delete('/:id', auth, allowedRoles(['owner', 'admin', ]), userController.destroy)

// @route   POST /user
// @desc    Toggle status
// @access  PRIVATE
router.post('/:id/toggleStatus', auth, allowedRoles(['owner', 'admin', ]), userController.toggleStatus)

module.exports = router