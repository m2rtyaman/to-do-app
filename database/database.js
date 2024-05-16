const { Sequelize } = require('sequelize');
const config = require('../config/config.js');

module.exports = new Sequelize(config.databaseName, config.databaseUsername, config.databasePassword, {
  host: config.host,
  dialect: config.dialect,
});
