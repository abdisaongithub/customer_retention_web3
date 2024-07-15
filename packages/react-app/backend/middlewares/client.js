const db = require('../models')
const Client = db.Client

module.exports = async function(req, res, next) {
    const { client_id } = req.body

    if (!client_id) {
        res.status(401).json({ message: "No client_id, authorization denied" })
    }
    try {
        const client = await Client.findOne({ where: { client_id: client_id } })
        if (!client) {
            return res.status(401).json({ message: "Client not recognized" })
        }

        req.body.client = client.name

        next()
    } catch (e) {
        return res.status(401).json({ message: "Client not recognized" })
    }
}