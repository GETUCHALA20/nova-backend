require('dotenv').config();

export default {
    development: {
      username: process.env.DEVELOPMENT_USERNAME,
      password: process.env.DEVELOPMENT_PASSWORD,
      database: process.env.DEVELOPMENT_DATABASE,
      port: process.env.DEVELOPMENT_PORT,
      host: process.env.DEVELOPMENT_HOST,
      dialect: process.env.DEVELOPMENT_DIALECT
    },
    test: {
      username: "root",
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    production: {
      username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "postgres"
    }
}