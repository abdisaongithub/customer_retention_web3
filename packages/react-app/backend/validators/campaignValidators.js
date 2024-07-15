const {
    check,
    body
} = require("express-validator")
const {
    validationErrorChecker
} = require("../middlewares/validationErrorChecker");

exports.campaignCreateValidator = [
    check('title', 'title is required').exists().isString(),
    check('description', 'description is required').exists().isString(),
    check('allocated_amount', 'allocated_amount is required').exists(),
    check('allocation_currency', 'allocation_currency is required').exists().isString(),
    check('logo', 'logo is required').optional(),
    check('verified', 'verified is required').isBoolean().optional(),
    check('cover_image', 'cover_image is required').optional(),
    check('start', 'start is required').exists(),
    check('end', 'end is required').exists(),
    check('prize_candidates', 'prize_candidates is required').exists(),
    body('logo').optional().custom((value, {
        req
    }) => {
        const allowedFormat = ['jpg', 'jpeg', 'png', 'gif', 'svg']
        const typeCheck = allowedFormat.includes(req.body.logo.type.split('/')[1].toLowerCase())
        const sizeCheck = req.body.logo.size > (1024 * 4) // 4 Mega Bytes maximum
        return typeCheck && sizeCheck;
    }).withMessage('logo must be of type jpg, jpeg, png, gif, or svg and less than 4 MB'),
    body('cover_image').optional().custom((value, {
        req
    }) => {
        const allowedFormat = ['jpg', 'jpeg', 'png', 'gif', 'svg']
        const typeCheck = allowedFormat.includes(req.body.cover_image.type.split('/')[1].toLowerCase())
        const sizeCheck = req.body.cover_image.size > (1024 * 4) // 4 Mega Bytes maximum
        return typeCheck && sizeCheck;
    }).withMessage('cover_image must be of type jpg, jpeg, png, gif, or svg and less than 4 MB'),
    validationErrorChecker
]


exports.campaignUpdateValidator = [
    check('title', 'title is required').exists().isString(),
    check('description', 'description is required').exists().isString(),
    check('allocated_amount', 'allocated_amount is required').exists(),
    check('allocation_currency', 'allocation_currency is required').exists().isString(),
    check('logo', 'logo is required').exists(),
    check('verified', 'verified is required').exists().isBoolean(),
    check('cover_image', 'cover_image is required').optional(),
    check('start', 'start is required').exists(),
    check('end', 'end is required').exists(),
    check('prize_candidates', 'prize_candidates is required').exists(),
    body('logo').exists().custom((value, {
        req
    }) => {
        const allowedFormat = ['jpg', 'jpeg', 'png', 'gif', 'svg']
        const typeCheck = allowedFormat.includes(req.body.logo.type.split('/')[1].toLowerCase())
        const sizeCheck = req.body.logo.size > (1024 * 4) // 4 Mega Bytes maximum
        return typeCheck && sizeCheck;
    }).withMessage('logo must be of type jpg, jpeg, png, gif, or svg and less than 4 MB'),
    body('cover_image').optional().custom((value, {
        req
    }) => {
        const allowedFormat = ['jpg', 'jpeg', 'png', 'gif', 'svg']
        const typeCheck = allowedFormat.includes(req.body.cover_image.type.split('/')[1].toLowerCase())
        const sizeCheck = req.body.cover_image.size > (1024 * 4) // 4 Mega Bytes maximum
        return typeCheck && sizeCheck;
    }).withMessage('cover_image must be of type jpg, jpeg, png, gif, or svg and less than 4 MB'),
    validationErrorChecker
]