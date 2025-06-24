const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // ajuste conforme sua estrutura
require('dotenv').config();

const secret = process.env.JWT_SECRET;

module.exports = {
  // Método para registrar usuário
  async register(req, res) {
    const { name, email, password, cep, state, city, district, street, number, complement } = req.body;

    try {
      // Verifica se já existe usuário com esse email
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }

      // Cria o usuário; senha será hasheada pelo hook no model
      const newUser = await User.create({
        name,
        email,
        password,
        cep,
        state,
        city,
        district,
        street,
        number,
        complement
      });

      // Remove senha do retorno
      const userData = newUser.toJSON();
      delete userData.password;

      res.status(201).json(userData);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  },

  // Método para login
  async login(req, res) {
    console.log("req", req.body)
    const { email, password } = req.body;

    try {
      // Busca usuário pelo email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      // Verifica a senha
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      // Gera token JWT
      const token = jwt.sign(
        { id: user.id, role: user.role },
        secret,
        { expiresIn: '1d' }
      );

      res.json({ token });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no login' });
    }
  }
};
