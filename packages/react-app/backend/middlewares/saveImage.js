const { randomInt } = require('node:crypto')
const { rename } = require('node:fs/promises')
const slugify = require('slugify')

const saveImage = async (oldPath, imageName, type) => {

    const names = imageName.split('.')
    let newName = ''

    if(names.length === 2){
        newName = names[0] + '-' + randomInt(1000) + '.' + names[1];
        newName = slugify(newName, '_')
    } else {
        for (let i =0; i < names.length ; i++){
            if(i+1 === names.length){
                newName = slugify(newName, '_')
                newName += '-' + randomInt(1000) + '.'
                newName += names[i];
                break
            }
            newName += names[i];
        }
    }
    await rename(oldPath, process.cwd() + '/storage/images/' + type + '/' + newName)

    return '/images/' + type + '/' + newName;
}

module.exports = saveImage