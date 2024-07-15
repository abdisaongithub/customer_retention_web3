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
const Notification = db.notification


exports.create = async (req, res) => {

    const {
        title,
        description,
        read,
    } = req.body

    try {
        const notificationModel = new Notification({
            title,
            description,
            read,
        })



        await notificationModel.save()

        return res.json({
            data: notificationModel
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

        const notification = await Notification.findAndCountAll({
            attributes: ['title', 'description', 'read', ],

            offset: offset,
            limit: limit
        })

        return res.send({
            data: {
                rows: notification.rows,
                count: notification.count,
                current_page: page,
                total_pages: Math.ceil(notification.count / limit)
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

    const id = req.params.id

    try {
        const notification = await Notification.findByPk(id, {
            attributes: ['id', 'title', 'description', 'read', 'createdAt', 'updatedAt', ],

        })

        if (!notification) {
            return res.status(404).send({
                message: 'Can\'t find Notification model with the provided id'
            })
        }

        return res.json({
            data: notification
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
        const notification = await Notification.findByPk(id)

        if (!notification) {
            return res.status(404).send({
                message: 'Can\'t find Notification model with the provided id'
            })
        }

        await notification.destroy()

        return res.status(204).json({})

    } catch (e) {
        if (debugMode) {
            console.log(e)
            return res.status(500).json(e)
        }
        return res.status(500).send('Server Error')
    }
}


exports.turnToTrueRead = async (req, res) => {
    const id = req.params.id

    try {
        const notification = await Notification.findByPk(id)
        if (!notification) {
            return res.status(404).send({
                message: 'Can\'t find Notification model with the provided id'
            })
        }

        notification.read = true

        await notification.save()

        return res.json({
            data: notification
        })
    } catch (e) {
        if (debugMode) {
            console.log(e)
            return res.status(500).json(e)
        }
        return res.status(500).send('Server Error')
    }
}