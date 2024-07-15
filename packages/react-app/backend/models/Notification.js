module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notifications", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: false
        },
        read: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            unique: false
        }
    }, {
        paranoid: true,
    });

    return Notification
};