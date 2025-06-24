const { Sequelize } = require('sequelize'); // Importa o construtor Sequelize da biblioteca sequelize
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// Cria uma nova instância do Sequelize para conectar ao banco de dados MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nome do banco de dados (ex: 'meu_banco')
  process.env.DB_USER,     // Usuário do banco de dados (ex: 'root')
  process.env.DB_PASSWORD, // Senha do banco de dados
  {
    host: process.env.DB_HOST, // Host onde o banco está rodando (ex: 'localhost')
    port: process.env.DB_PORT, // Porta do banco (ex: 3306)
    dialect: 'mysql',          // Dialeto do banco, aqui especificando MySQL
    logging: false,            // Desativa a exibição das queries SQL no terminal
  }
);

module.exports = sequelize; // Exporta a instância para ser usada em outros arquivos
