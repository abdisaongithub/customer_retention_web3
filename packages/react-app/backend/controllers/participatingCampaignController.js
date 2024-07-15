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
const ParticipatingCampaign = db.participatingCampaign


exports.create = async (req, res) => {

    const {} = req.body

    try {
        const participatingCampaignModel = new ParticipatingCampaign({})



        await participatingCampaignModel.save()

        return res.json({
            data: participatingCampaignModel
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

        const participatingCampaign = await ParticipatingCampaign.findAndCountAll({
            attributes: ['status', ],

            offset: offset,
            limit: limit
        })

        return res.send({
            data: {
                rows: participatingCampaign.rows,
                count: participatingCampaign.count,
                current_page: page,
                total_pages: Math.ceil(participatingCampaign.count / limit)
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
    const User = db.user
    const Campaign = db.campaign

    const id = req.params.id

    try {
        const participatingCampaign = await ParticipatingCampaign.findByPk(id, {
            attributes: ['id', 'status', 'createdAt', 'updatedAt', ],
            include: [{
                    model: User,
                    attributes: ['id', 'name', 'email', 'status', 'password', 'createdAt', 'updatedAt', ],
                    as: 'users',
                },
                {
                    model: Campaign,
                    attributes: ['id', 'title', 'description', 'allocated_amount', 'allocation_currency', 'logo', 'verified', 'cover_image', 'start', 'end', 'prize_candidates', 'createdAt', 'updatedAt', ],
                    as: 'campaigns',
                },
            ]
        })

        if (!participatingCampaign) {
            return res.status(404).send({
                message: 'Can\'t find ParticipatingCampaign model with the provided id'
            })
        }

        return res.json({
            data: participatingCampaign
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
        status,
    } = req.body

    try {
        const participatingCampaignModel = await ParticipatingCampaign.findByPk(id)
        if (!participatingCampaignModel) {
            return res.status(404).send({
                message: 'Can\'t find ParticipatingCampaign model with the provided id'
            })
        }



        participatingCampaignModel.status = status


        await participatingCampaignModel.save()


        return res.json({
            data: participatingCampaignModel
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
        const participatingCampaign = await ParticipatingCampaign.findByPk(id)

        if (!participatingCampaign) {
            return res.status(404).send({
                message: 'Can\'t find ParticipatingCampaign model with the provided id'
            })
        }

        await participatingCampaign.destroy()

        return res.status(204).json({})

    } catch (e) {
        if (debugMode) {
            console.log(e)
            return res.status(500).json(e)
        }
        return res.status(500).send('Server Error')
    }
}