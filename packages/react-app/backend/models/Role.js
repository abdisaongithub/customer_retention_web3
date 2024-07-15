module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        displayName: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: false
        }
    }, {
        paranoid: true,
    });

    return Role
};