const jwt = require('jsonwebtoken')
const config = require('config')
const db = require('../models')
const {getSafeUser} = require("../helpers/hide_user_credentials");
const User = db.user
const Role = db.role

module.exports = async function (req, res, next) {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({message: "no token, authorization denied"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = getSafeUser(await User.findByPk(decoded.user.id, {include: {model: Role, as: 'roles'}}))
        next()
    } catch (e) {
        return res.status(401).json({message: "Token is not valid"})
    }
}
