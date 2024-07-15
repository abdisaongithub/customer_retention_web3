const {
    check,
    body
} = require("express-validator")
const {
    validationErrorChecker
} = require("../middlewares/validationErrorChecker");

exports.taskCreateValidator = [
    check('label', 'label is required').exists().isString(),
    check('icon', 'icon is required').optional(),
    check('link', 'link is required').exists().optional(),
    check('required', 'required is required').isBoolean().optional(),
    body('icon').optional().custom((value, {
        req
    }) => {
        const allowedFormat = ['jpg', 'jpeg', 'png', 'gif', 'svg']
        const typeCheck = allowedFormat.includes(req.body.icon.type.split('/')[1].toLowerCase())
        const sizeCheck = req.body.icon.size > (1024 * 4) // 4 Mega Bytes maximum
        return typeCheck && sizeCheck;
    }).withMessage('icon must be of type jpg, jpeg, png, gif, or svg and less than 4 MB'),
    validationErrorChecker
]


exports.taskUpdateValidator = [
    check('label', 'label is required').exists().isString(),
    check('icon', 'icon is required').optional(),
    check('link', 'link is required').exists().optional(),
    check('required', 'required is required').isBoolean().optional(),
    body('icon').optional().custom((value, {
        req
    }) => {
        const allowedFormat = ['jpg', 'jpeg', 'png', 'gif', 'svg']
        const typeCheck = allowedFormat.includes(req.body.icon.type.split('/')[1].toLowerCase())
        const sizeCheck = req.body.icon.size > (1024 * 4) // 4 Mega Bytes maximum
        return typeCheck && sizeCheck;
    }).withMessage('icon must be of type jpg, jpeg, png, gif, or svg and less than 4 MB'),
    validationErrorChecker
]