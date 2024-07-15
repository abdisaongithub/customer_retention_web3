const config = require('config')

module.exports = function (req, res, next) {
    try {
        // if paid
        if (true){
            next()
        } else {
            return res.status(402).json({message: 'Payment is required to see detail'})
        }
    } catch (e) {
        return res.status(500).json({message: 'An error has occured'})
    }
}
