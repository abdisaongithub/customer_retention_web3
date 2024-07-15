const {
    check,
    body
} = require("express-validator")
const {
    validationErrorChecker
} = require("../middlewares/validationErrorChecker");

exports.participatingCampaignCreateValidator = [
    validationErrorChecker
]


exports.participatingCampaignUpdateValidator = [
    check('status', 'status is required').exists().isString(),
    validationErrorChecker
]