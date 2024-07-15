module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            unique: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: false
        }
    }, {
        paranoid: true,
    });

    return User
};