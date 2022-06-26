require('dotenv').config();

const config = {
    development: {
      username: process.env.DEVELOPMENT_USERNAME,
      password: process.env.DEVELOPMENT_PASSWORD,
      database: process.env.DEVELOPMENT_DATABASE,
      port: process.env.DEVELOPMENT_PORT,
      host: process.env.DEVELOPMENT_HOST,
      dialect: process.env.DEVELOPMENT_DIALECT
    },
    test: {
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD,
      database: process.env.TEST_DATABASE,
      port: process.env.TEST_PORT,
      host: process.env.TEST_HOST,
      dialect: process.env.TEST_DIALECT
    },
    production: {
      username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "postgres"
    }
}

module.exports = config;