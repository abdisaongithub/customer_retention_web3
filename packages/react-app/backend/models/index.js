const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    operatorsAliases: 0,
    logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require('./User')(sequelize, Sequelize)
const User = db.user

db.role = require('./Role')(sequelize, Sequelize)
const Role = db.role

db.campaign = require('./Campaign')(sequelize, Sequelize)
const Campaign = db.campaign

db.task = require('./Task')(sequelize, Sequelize)
const Task = db.task

db.notification = require('./Notification')(sequelize, Sequelize)
const Notification = db.notification

db.participatingCampaign = require('./ParticipatingCampaign')(sequelize, Sequelize)
const ParticipatingCampaign = db.participatingCampaign

User.belongsToMany(Role, {
    through: 'role_user',
    as: 'roles',
    foreignKey: 'user_id',
})

Role.belongsToMany(User, {
    through: 'role_user',
    as: 'users',
    foreignKey: 'role_id',
})

Campaign.hasMany(Task)
Task.belongsTo(Campaign)

ParticipatingCampaign.belongsToMany(User, {
    through: 'user_participatingCampaign',
    as: 'users',
    foreignKey: 'participating_campaign_id',
})

User.belongsToMany(ParticipatingCampaign, {
    through: 'user_participatingCampaign',
    as: 'participating_campaigns',
    foreignKey: 'user_id',
})

Campaign.hasMany(ParticipatingCampaign)
ParticipatingCampaign.belongsTo(Campaign)


module.exports = db;