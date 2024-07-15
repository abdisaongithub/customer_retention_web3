const nodemailer = require("nodemailer");

// @desc    Utility function for sending confirmation email
// @access  Private
exports.sendConfirmationEmail = async (obj, token) => {
    const link = 'http://localhost:5000/api/auth/confirm_email?token=' + obj.token;

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: obj.email,
        subject: 'Sign in to <<<>>',
        text: 'Hello! Click the link below to finish signing in to <<<>>.\r\n\r\n' + link,
        html: '<h3>Hello!</h3><p>Click the link below to finish signing in to <<<>>>.</p><p><a href="' + link + '">Verify Email</a></p>',
    };



    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return false
        } else {
            console.log('Email sent: ' + info.response);
            return true
        }
    });

}


// @desc    Utility function for sending "password reset number" email
// @access  Private
exports.sendResetEmail = async (obj) => {

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: obj.email,
        subject: 'Reset <<<>>> account',
        text: 'Hello! Use the number to reset your account.\r\n\r\n',
        html: '<h3>Hello!</h3><p>Use the number below to finish resetting your password to <<<>>>.</p> \r\n\r\n <p>' + obj.number + '</p>',
    };


    await transporter.sendMail(mailOptions, function (error, info) {
        return !error;
    });
}
