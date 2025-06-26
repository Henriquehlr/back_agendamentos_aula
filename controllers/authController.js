const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const registerLog = require('../utils/registerLog');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

module.exports = {
  async register(req, res) {
    const { name, email, password, cep, state, city, district, street, number, complement } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }

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

      const userData = newUser.toJSON();
      delete userData.password;

      res.status(201).json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        secret,
        { expiresIn: '1d' }
      );

      await registerLog({
        name: user.name,
        activityType: "Login",
        module: "Autenticação",
        userId: user.id,
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no login' });
    }
  }
};
