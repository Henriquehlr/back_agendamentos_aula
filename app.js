const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const roomRoutes = require('./routes/roomRoutes');

require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true // se usar cookies ou headers personalizados
}));

app.use(express.json());

// Rotas
app.use('/users', userRoutes);
app.use('/auth', authRoutes); 
app.use('/bookings', bookingRoutes);
app.use('/rooms', roomRoutes);

// Conexão e sincronização com banco
sequelize.authenticate()
  .then(() => console.log('Conectado ao MySQL com sucesso!'))
  .catch(err => console.error('Erro ao conectar:', err));

sequelize.sync()
  .then(() => console.log('Banco sincronizado!'))
  .catch(err => console.error('Erro ao sincronizar banco:', err));

// Start do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
