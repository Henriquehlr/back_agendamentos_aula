const axios = require('axios');
const User = require('../models/User');

module.exports = {
  // Criar novo usuário
  async create(req, res) {
    try {
      const {
        name, email, password,
        cep, number, complement
      } = req.body;

      // Buscar dados do CEP
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (response.data.erro) {
        return res.status(400).json({ error: 'CEP inválido' });
      }

      const { uf, localidade, bairro, logradouro } = response.data;

      const user = await User.create({
        name,
        email,
        password,
        cep,
        state: uf,
        city: localidade,
        district: bairro,
        street: logradouro,
        number,
        complement
      });

      // Opcional: remover senha do retorno
      const { password: _, ...userData } = user.toJSON();

      return res.status(201).json(userData);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },

  // Listar todos os usuários
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] } // não retornar senha
      });

      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }
};
