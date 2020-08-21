require('dotenv').config();

module.exports = {
    "development": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASS,
      "database": process.env.DB_NAME,
      "host": process.env.DB_HOST,
      "dialect": "postgres",
      "operatorsAliases": 0
    },
    "test": {
      "username": process.env.DB_HOST_TEST,
      "password": process.env.DB_USER_TEST,
      "database": process.env.DB_PASS_TEST,
      "host": process.env.DB_NAME_TEST,
      "dialect": "postgres",
      "operatorsAliases": 0
    },
    "production": {
      "username": process.env.DB_HOST_PRO,
      "password": process.env.DB_USER_PRO,
      "database": process.env.DB_PASS_PRO,
      "host": process.env.DB_NAME_PRO,
      "dialect": "postgres",
      "operatorsAliases": 0
    }
}