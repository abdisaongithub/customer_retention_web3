exports.capitalizeFirst = (text) => {
    return text[0].toUpperCase() + text.substring(1, text.length).toLowerCase()
}