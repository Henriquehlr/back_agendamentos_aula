
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

app.use(express.json());
app.use(userRoutes);

// sequelize.sync({ force: true }); // cuidado: apaga tudo!
// sequelize.sync(); // sincroniza sem apagar

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// vai criar a tabela automaticamente se ela não existir
sequelize.authenticate()
  .then(() => console.log('Conectado ao MySQL com sucesso!'))
  .catch((err) => console.error('Erro ao conectar:', err));

  sequelize.sync()
  .then(() => {
    console.log('Banco sincronizado!');
  })
  .catch(err => {
    console.error('Erro ao sincronizar banco:', err);
  });
