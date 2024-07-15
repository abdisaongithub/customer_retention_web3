exports.getSafeUser = (user) => {
    let new_user = {}
    new_user.id = user.id
    new_user.email = user.email
    new_user.status = user.status
    new_user.name = user.name
    new_user.phone = user.phone
    new_user.roles = user.roles ?? []

    return new_user
}