require('dotenv').config();

const config = {
    databaseName: process.env.DATABASE_NAME,
    databaseUsername: process.env.DATABASE_USERNAME,
    databasePassword: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DIALECT,
  };
  
  module.exports = config;