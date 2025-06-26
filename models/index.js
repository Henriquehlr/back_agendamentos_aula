const { Sequelize } = require("sequelize"); 
const { DataTypes } = require("sequelize");
const UserModel = require("./User"); 
const BookingModel = require('./bookings');
const RoomModel = require('./room'); 
const LogModel = require("./log");

require('dotenv').config(); 

// Cria uma instância do Sequelize conectada ao banco MySQL com dados do .env
const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,     
  process.env.DB_PASSWORD, 
  {
    host: "localhost",    
    dialect: "mysql",     
  }
);

// Inicializa os modelos passando a instância do Sequelize
const User = UserModel(sequelize);
const Booking = BookingModel(sequelize);
const Room = RoomModel(sequelize);
const Log = LogModel(sequelize, DataTypes);

// Relações
Booking.belongsTo(User, { as: 'user', foreignKey: 'userId' });
User.hasMany(Booking, { as: 'bookings', foreignKey: 'userId' });

// Sincroniza os modelos com o banco, criando as tabelas caso não existam
sequelize.sync();

module.exports = {
  sequelize, 
  User,  
  Booking,
  Room, 
  Log
};
