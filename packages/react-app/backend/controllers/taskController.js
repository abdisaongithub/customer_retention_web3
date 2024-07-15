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
const Task = db.task


exports.create = async (req, res) => {

    const {
        label,
        link,
        required,
    } = req.body

    try {
        const taskModel = new Task({
            label,
            link,
            required,
        })

        taskModel.icon = await saveFile(req.files.icon.path, req.files.icon.name, 'undefined')


        await taskModel.save()

        return res.json({
            data: taskModel
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

        const task = await Task.findAndCountAll({
            attributes: ['label', 'icon', 'link', 'required', ],

            offset: offset,
            limit: limit
        })

        return res.send({
            data: {
                rows: task.rows,
                count: task.count,
                current_page: page,
                total_pages: Math.ceil(task.count / limit)
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
        const task = await Task.findByPk(id, {
            attributes: ['id', 'label', 'icon', 'link', 'required', 'createdAt', 'updatedAt', ],

        })

        if (!task) {
            return res.status(404).send({
                message: 'Can\'t find Task model with the provided id'
            })
        }

        return res.json({
            data: task
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
        label,
        link,
        required,
    } = req.body

    try {
        const taskModel = await Task.findByPk(id)
        if (!taskModel) {
            return res.status(404).send({
                message: 'Can\'t find Task model with the provided id'
            })
        }

        if (typeof req.files.icon === 'object') {
            await deleteFile(taskModel.icon)
        }

        taskModel.icon = await saveFile(req.files.icon.path, req.files.icon.name, 'undefined')


        taskModel.label = label
        taskModel.link = link
        taskModel.required = required


        await taskModel.save()


        return res.json({
            data: taskModel
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
        const task = await Task.findByPk(id)

        if (!task) {
            return res.status(404).send({
                message: 'Can\'t find Task model with the provided id'
            })
        }

        await task.destroy()

        return res.status(204).json({})

    } catch (e) {
        if (debugMode) {
            console.log(e)
            return res.status(500).json(e)
        }
        return res.status(500).send('Server Error')
    }
}