const readline = require('readline')
const db = require("../models");
const dotenv = require('dotenv')

dotenv.config()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Are you sure you want to Drop everything and sync database? ', (answer) => {
    if (answer.startsWith('Y') ||
        answer.startsWith('y') ||
        answer === 'yes' ||
        answer === 'YES' ||
        answer === 'Yes') {
        db.sequelize.sync({
                force: true
            })
            .catch((e) => {
                console.log(e)
            })
            .then((e) => {
                console.log("Dropped and re-synced db")
                process.exit()
            });
    } else {
        console.log('Command aborted')
        process.exit()
    }
})