const {
    validationResult
} = require("express-validator")
const db = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const saveFile = require('../middlewares/saveFile')
const deleteFile = require('../middlewares/deleteFile')
const debugMode = process.env.DEBUG && true

const config = require('../config/default.json')
const User = db.user


exports.create = async (req, res) => {

    const {
        name,
        email,
        phone,
    } = req.body

    try {
        const userModel = new User({
            name,
            email,
            phone,
        })



        await userModel.save()

        return res.json({
            data: userModel
        })

    } catch (e) {
        if (debugMode) {
            console.log(e)
            return res.status(500).json(e)
        }
        return res.status(500).send('Server Error')
    }
}


exports.list = async (req, res) => {
    let limit = config.paginationLimit
    let offset = 0

    try {
        const page = req.query.page
        if (page) {
            offset = (page - 1) * limit
        }

        const user = await User.findAndCountAll({
            attributes: ['id', 'name', 'phone', ],

            offset: offset,
            limit: limit
        })

        return res.send({
            data: {
                rows: user.rows,
                count: user.count,
                current_page: page,
                total_pages: Math.ceil(user.count / limit)
            }
        })
    } catch (e) {
        if (debugMode) {
            console.log(e)
            return res.status(500).json(e)
        }
        return res.status(500).send('Server Error');
    }
}

exports.view = async (req, res) => {
    const Role = db.role

    const id = req.params.id

    try {
        const user = await User.findByPk(id, {
            attributes: ['id', 'name', 'email', 'phone', 'createdAt', 'updatedAt', 'status', ],
            include: [{
                model: Role,
                attributes: ['id', 'role', 'displayName', 'description', ],
                as: 'roles',
            }, ]
        })

        if (!user) {
            return res.status(404).send({
                message: 'Can\'t find User model with the provided id'
            })
        }

        return res.json({
            data: user
        })

    } catch (e) {
        if (debugMode) {
            console.log(e)
            return res.status(500).json(e)
        }
        return res.status(500).send('Server Error')
    }
}

exports.update = async (req, res) => {
    const id = req.params.id

    const {
        name,
        email,
        phone,
    } = req.body

    try {
        const userModel = await User.findByPk(id)
        if (!userModel) {
            return res.status(404).send({
                message: 'Can\'t find User model with the provided id'
            })
        }



        userModel.name = name
        userModel.email = email
        userModel.phone = phone


        await userModel.save()


        return res.json({
            data: userModel
        })

    } catch (e) {
        if (debugMode) {
            console.log(e)
            return res.status(500).json(e)
        }
        return res.status(500).send('Server Error')
    }
}


exports.destroy = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).send({
                message: 'Can\'t find User model with the provided id'
            })
        }

        await user.destroy()

        return res.status(204).json({})

    } catch (e) {
        if (debugMode) {
            console.log(e)
            return res.status(500).json(e)
        }
        return res.status(500).send('Server Error')
    }
}


exports.toggleStatus = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findByPk(id)
        if (!user) {
            return res.status(404).send({
                message: 'Can\'t find User model with the provided id'
            })
        }

        user.status = !user.status

        await user.save()

        return res.json({
            data: user
        })

    } catch (e) {
        if (debugMode) {
            console.log(e)
            return res.status(500).json(e)
        }
        return res.status(500).send('Server Error')
    }
}