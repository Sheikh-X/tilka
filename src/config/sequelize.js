const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.sequelize.database, config.sequelize.user, config.sequelize.password, {
  dialect: 'postgres',
  host: config.sequelize.host,
  port: config.sequelize.port,
  database: config.sequelize.database,
  user: config.sequelize.username,
  password: config.sequelize.password,
});

module.exports = sequelize;
