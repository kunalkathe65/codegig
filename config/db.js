const Sequelize = require('sequelize');

module.exports = new Sequelize(
  process.env.DB,
  process.env.DB_HOST,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    operatorAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
