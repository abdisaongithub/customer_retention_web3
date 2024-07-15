const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const {
    allowedRoles
} = require('../../middlewares/allowedRoles')
const participatingCampaignController = require('../../controllers/participatingCampaignController')
const participatingCampaignValidators = require("../../validators/participatingCampaignValidators")

// @route   POST participatingcampaign
// @desc    Fetch all ParticipatingCampaigns
// @access  PRIVATE
router.post('/', auth, allowedRoles(['admin', 'nexusers', ]), participatingCampaignValidators.participatingCampaignCreateValidator, participatingCampaignController.create)

// @route   GET participatingcampaign
// @desc    Fetch a/an ParticipatingCampaign
// @access  PRIVATE
router.get('/', auth, allowedRoles(['admin', 'nexusers', ]), participatingCampaignController.list)

// @route   GET participatingcampaign
// @desc    Fetch a/an ParticipatingCampaign
// @access  PRIVATE
router.get('/:id', auth, allowedRoles(['admin', 'nexusers', ]), participatingCampaignController.view)

// @route   PUT participatingcampaign
// @desc    Update a/an ParticipatingCampaign
// @access  PRIVATE
router.put('/:id', auth, allowedRoles(['admin', 'nexusers', ]), participatingCampaignValidators.participatingCampaignUpdateValidator, participatingCampaignController.update)

// @route   DELETE participatingcampaign
// @desc    Delete a/an ParticipatingCampaign
// @access  PRIVATE
router.delete('/:id', auth, allowedRoles(['admin', ]), participatingCampaignController.destroy)

module.exports = router