const {
    check,
    body
} = require("express-validator")
const {
    validationErrorChecker
} = require("../middlewares/validationErrorChecker");

exports.roleCreateValidator = [
    check('role', '').exists().isString(),
    check('displayName', '').exists().normalizeEmail().isEmail().isString(),
    check('description', '').optional().isString().isLength({
        min: 9,
        max: 15
    }),
    validationErrorChecker
]


exports.roleUpdateValidator = [
    check('role', '').exists().isString(),
    check('displayName', '').exists().isString(),
    check('description', '').optional().isString().isLength({
        min: 9,
        max: 15
    }).isString(),
    validationErrorChecker
]