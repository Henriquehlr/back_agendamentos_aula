const axios = require('axios');
const { User } = require('../models');

module.exports = {
  // Criação de usuário
  async createUser(req, res) {
    try {
      const {
        name,
        email,
        password,
        cep,
        number,
        complement,
        permissions, // novo campo: permissões do usuário (array)
        status       // novo campo: status ativo/inativo (boolean)
      } = req.body;

      // Consulta o endereço via API do ViaCEP
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (response.data.erro) {
        return res.status(400).json({ error: 'CEP inválido' });
      }

      // Desestruturação dos dados retornados pelo ViaCEP
      const { uf, localidade, bairro, logradouro } = response.data;

      // Criação do usuário no banco
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
        complement,
        permissions, // salva as permissões
        status       // salva o status
      });

      // Remove o campo "password" da resposta
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
        attributes: { exclude: ['password'] } // exclui a senha da resposta
      });
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  },

  // Retornar o perfil do usuário autenticado
  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.userId, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar perfil' });
    }
  }
};
