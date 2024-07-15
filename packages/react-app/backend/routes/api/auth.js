const express = require('express')
const {check} = require('express-validator')
const router = express.Router()
const auth = require('../../middlewares/auth')
const authController = require("../../controllers/auth/authController");


// @route   GET api/auth
// @desc    Fetch profile info
// @access  Private
router.get('/me', authController.getUserProfile)


// @route   PUT api/auth
// @desc    Update profile info
// @access  Private

router.put('/me', [
        check('name', 'Name must be provided')
            .isString(),
        check('phone', 'phone number must be a number')
            .isMobilePhone(),
        check('email', 'email must be a valid email')
            .isEmail()
    ],
    auth,
    authController.updateUserProfile
)


// @route   POST api/auth
// @desc    Login
// @access  Public

router.post('/login',
    [
        check('email', 'Email must be provided')
            .isEmail(),
        check('password', 'Password must be provided')
            .exists(),
    ],
    authController.login
);


// @route   POST api/auth
// @desc    Login
// @access  Private

router.post('/change_password', [
        check('password', 'Password must be at least 6 characters long')
            .exists(),
        check('new_password', 'New password must be at least 6 characters long')
            .isLength({min: 6}),
    ],
    auth,
    authController.changePassword
)


// @route   GET api/auth
// @desc    Confirm token sent over email
// @access  Public

router.get('/confirm_email', authController.confirmEmail)


// @route   POST api/auth
// @desc    Register a user
// @access  Public

router.post('/register', [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('phone', 'Phone number is required, and must be between 9 and 14 characters')
            .isLength({min: 9, max: 14}),
        check('email', 'Please include a valid email')
            .isEmail(),
        check('password', 'Please enter a password with 6 or more characters')
            .isLength({min: 6})
    ],
    authController.register
);


// @route   POST api/auth
// @desc    Get account resetting email
// @access  Public

router.post('/reset_password', [
        check('email', 'a valid email must be provided')
            .isEmail(),
    ],
    authController.resetPassword
)


// @route   POST api/auth
// @desc    Get account resetting email
// @access  Public

router.post('/confirm_reset', [
        check('token', 'a 6 digit number must be provided')
            .isNumeric(),
        check('email', 'a valid email must be provided')
            .isEmail(),
        check('password', 'a password must be provided')
            .exists(),
    ],
    authController.confirmPassword
)

module.exports = router;