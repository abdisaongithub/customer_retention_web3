module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
        label: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false
        },
        icon: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: false
        },
        link: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false
        },
        required: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            unique: false
        }
    }, {
        paranoid: true,
    });

    return Task
};