/**
 * This middleware can only be called after authentication has taken place
 * it only allows roles that are mentioned to further progress into the application
 *
 * @returns {(function(*, *, *): Promise<*>)|*}
 * @param allowedRoles
 */
exports.allowedRoles = (allowedRoles = []) => {
    return (req, res, next) => {
        const currentUserRoles = req.user.roles
        let isAllowed = false

        for  (let i=0; i<currentUserRoles.length; i++){
            if (allowedRoles.includes(currentUserRoles[i].role.toLowerCase())) {
                isAllowed = true
                next()
                break;
            }
            if (allowedRoles.includes('owner')) {
                // TODO: do some magic to check if the current user owns the object
            }
        }


        if (!isAllowed)
            return res.status(403).send({message: 'Action not allowed for particular user'})

    }
}
