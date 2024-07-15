const {
    check,
    body
} = require("express-validator")
const {
    validationErrorChecker
} = require("../middlewares/validationErrorChecker");

exports.notificationCreateValidator = [
    check('title', 'title is required').exists().isString(),
    check('description', 'description is required').exists().isString(),
    check('read', 'read is required').exists().isBoolean(),
    validationErrorChecker
]