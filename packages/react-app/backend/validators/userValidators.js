const {
    check,
    body
} = require("express-validator")
const {
    validationErrorChecker
} = require("../middlewares/validationErrorChecker");

exports.userCreateValidator = [
    check('name', 'name is required').exists().isString(),
    check('email', 'email is required').exists().normalizeEmail().isEmail(),
    check('phone', 'phone is required').optional().isString().isLength({
        min: 9,
        max: 15
    }),
    validationErrorChecker
]


exports.userUpdateValidator = [
    check('name', '').exists().isString(),
    check('email', '').exists().normalizeEmail().isEmail(),
    check('phone', '').optional().isString().isLength({
        min: 9,
        max: 15
    }),
    validationErrorChecker
]