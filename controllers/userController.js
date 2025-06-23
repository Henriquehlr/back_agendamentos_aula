const axios = require('axios');
const { User } = require('../models');
 
module.exports = {
  async createUser(req, res) {

    try {
      const { name, email, password, cep, number, complement } = req.body;
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

      // Remover senha do retorno
      const { password: _, ...userData } = user.toJSON();

      return res.status(201).json(userData);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },

  // Listar todos os usuários
  async listUser(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] }
      });
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }
};
