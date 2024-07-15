module.exports = (sequelize, Sequelize) => {
    const Campaign = sequelize.define("campaigns", {
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
        allocated_amount: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            unique: false
        },
        allocation_currency: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false
        },
        logo: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false
        },
        verified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            unique: false
        },
        cover_image: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: false
        },
        start: {
            type: Sequelize.DATE,
            allowNull: true,
            unique: false
        },
        end: {
            type: Sequelize.DATE,
            allowNull: false,
            unique: false
        },
        prize_candidates: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: false
        }
    }, {
        paranoid: true,
    });

    return Campaign
};