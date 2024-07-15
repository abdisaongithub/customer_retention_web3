const {randomInt} = require('node:crypto')
const {unlink} = require('node:fs/promises')
const slugify = require('slugify')

const deleteFile = async (filePath) => {
    try {
        await unlink(process.cwd() + '/storage' + filePath)
        return true
    } catch (e) {
        return false
    }
}

module.exports = deleteFile