const { Sequelize } = require("sequelize");
const UserModel = require("./User");

require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const User = UserModel(sequelize);

sequelize.sync(); // Cria tabelas automaticamente

module.exports = {
  sequelize,
  User,
};
