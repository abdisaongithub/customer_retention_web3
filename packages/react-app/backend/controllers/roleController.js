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
const Role = db.role


exports.create = async (req, res) => {

    const {
        role,
        displayName,
        description,
    } = req.body

    try {
        const roleModel = new Role({
            role,
            displayName,
            description,
        })



        await roleModel.save()

        return res.json({
            data: roleModel
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

        const role = await Role.findAndCountAll({
            attributes: ['id', 'name', 'phone', ],

            offset: offset,
            limit: limit
        })

        return res.send({
            data: {
                rows: role.rows,
                count: role.count,
                current_page: page,
                total_pages: Math.ceil(role.count / limit)
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
        const role = await Role.findByPk(id, {
            attributes: ['id', 'name', 'email', 'description', 'phone', 'createdAt', 'updatedAt', ],

        })

        if (!role) {
            return res.status(404).send({
                message: 'Can\'t find Role model with the provided id'
            })
        }

        return res.json({
            data: role
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
        role,
        displayName,
        description,
    } = req.body

    try {
        const roleModel = await Role.findByPk(id)
        if (!roleModel) {
            return res.status(404).send({
                message: 'Can\'t find Role model with the provided id'
            })
        }



        roleModel.role = role
        roleModel.displayName = displayName
        roleModel.description = description


        await roleModel.save()


        return res.json({
            data: roleModel
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
        const role = await Role.findByPk(id)

        if (!role) {
            return res.status(404).send({
                message: 'Can\'t find Role model with the provided id'
            })
        }

        await role.destroy()

        return res.status(204).json({})

    } catch (e) {
        if (debugMode) {
            console.log(e)
            return res.status(500).json(e)
        }
        return res.status(500).send('Server Error')
    }
}