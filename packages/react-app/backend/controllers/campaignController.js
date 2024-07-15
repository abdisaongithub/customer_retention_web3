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
const Campaign = db.campaign


exports.create = async (req, res) => {

    const {
        title,
        description,
        allocated_amount,
        allocation_currency,
        verified,
        start,
        end,
        prize_candidates,
    } = req.body

    try {
        const campaignModel = new Campaign({
            title,
            description,
            allocated_amount,
            allocation_currency,
            verified,
            start,
            end,
            prize_candidates,
        })

        campaignModel.logo = await saveFile(req.files.logo.path, req.files.logo.name, 'undefined')
        campaignModel.cover_image = await saveFile(req.files.cover_image.path, req.files.cover_image.name, 'undefined')


        await campaignModel.save()

        return res.json({
            data: campaignModel
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

        const campaign = await Campaign.findAndCountAll({
            attributes: ['title', 'description', 'allocated_amount', 'allocation_currency', 'verified', ],

            offset: offset,
            limit: limit
        })

        return res.send({
            data: {
                rows: campaign.rows,
                count: campaign.count,
                current_page: page,
                total_pages: Math.ceil(campaign.count / limit)
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
    const Task = db.task

    const id = req.params.id

    try {
        const campaign = await Campaign.findByPk(id, {
            attributes: ['id', 'title', 'description', 'allocated_amount', 'allocation_currency', 'logo', 'verified', 'cover_image', 'start', 'end', 'prize_candidates', 'createdAt', 'updatedAt', ],
            include: [{
                model: Task,
                attributes: ['id', 'label', 'icon', 'link', 'required', 'createdAt', 'updatedAt', ],
                as: 'tasks',
            }, ]
        })

        if (!campaign) {
            return res.status(404).send({
                message: 'Can\'t find Campaign model with the provided id'
            })
        }

        return res.json({
            data: campaign
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
        title,
        description,
        allocated_amount,
        allocation_currency,
        verified,
        start,
        end,
        prize_candidates,
    } = req.body

    try {
        const campaignModel = await Campaign.findByPk(id)
        if (!campaignModel) {
            return res.status(404).send({
                message: 'Can\'t find Campaign model with the provided id'
            })
        }

        if (typeof req.files.logo === 'object') {
            await deleteFile(campaignModel.logo)
        }

        if (typeof req.files.cover_image === 'object') {
            await deleteFile(campaignModel.cover_image)
        }

        campaignModel.logo = await saveFile(req.files.logo.path, req.files.logo.name, 'undefined')
        campaignModel.cover_image = await saveFile(req.files.cover_image.path, req.files.cover_image.name, 'undefined')


        campaignModel.title = title
        campaignModel.description = description
        campaignModel.allocated_amount = allocated_amount
        campaignModel.allocation_currency = allocation_currency
        campaignModel.verified = verified
        campaignModel.start = start
        campaignModel.end = end
        campaignModel.prize_candidates = prize_candidates


        await campaignModel.save()


        return res.json({
            data: campaignModel
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
        const campaign = await Campaign.findByPk(id)

        if (!campaign) {
            return res.status(404).send({
                message: 'Can\'t find Campaign model with the provided id'
            })
        }

        await campaign.destroy()

        return res.status(204).json({})

    } catch (e) {
        if (debugMode) {
            console.log(e)
            return res.status(500).json(e)
        }
        return res.status(500).send('Server Error')
    }
}


exports.toggleVerified = async (req, res) => {
    const id = req.params.id
    try {
        const campaign = await Campaign.findByPk(id)
        if (!campaign) {
            return res.status(404).send({
                message: 'Can\'t find Campaign model with the provided id'
            })
        }

        campaign.verified = !campaign.verified

        await campaign.save()

        return res.json({
            data: campaign
        })

    } catch (e) {
        if (debugMode) {
            console.log(e)
            return res.status(500).json(e)
        }
        return res.status(500).send('Server Error')
    }
}