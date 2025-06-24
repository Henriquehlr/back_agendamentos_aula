const { Sequelize } = require("sequelize"); // Importa o construtor Sequelize da biblioteca sequelize
const UserModel = require("./User"); // Importa a definição do modelo User
const BookingModel = require('./bookings');

require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

// Cria uma instância do Sequelize conectada ao banco MySQL com dados do .env
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nome do banco de dados
  process.env.DB_USER,     // Usuário do banco de dados
  process.env.DB_PASSWORD, // Senha do banco de dados
  {
    host: "localhost",    // Host do banco de dados (localhost fixo aqui)
    dialect: "mysql",     // Dialeto MySQL para comunicação
  }
);

// Inicializa os modelos passando a instância do Sequelize
const User = UserModel(sequelize);
const Booking = BookingModel(sequelize);
Booking.belongsTo(User, { as: 'user', foreignKey: 'userId' });
User.hasMany(Booking, { as: 'bookings', foreignKey: 'userId' });
// Sincroniza os modelos com o banco, criando as tabelas caso não existam
sequelize.sync();

module.exports = {
  sequelize, // Exporta a instância do Sequelize para uso externo
  User,  // Exporta o modelo User para ser usado em outros módulos
  Booking,    
};
