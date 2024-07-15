module.exports = (sequelize, Sequelize) => {
    const ParticipatingCampaign = sequelize.define("participating_campaigns", {
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        paranoid: true,
    });

    return ParticipatingCampaign
};