const dotenv = require('dotenv')
dotenv.config()

const db = require("../models");

db.sequelize.sync({
        alter: true
    })
    .catch((e) => {
        process.env.DEBUG ? console.error(e) : console.error('Something error happened')
        process.exit()
    })
    .then((e) => {
        console.log('Successfully migrated the database models')
        process.exit()
    })