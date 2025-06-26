const axios = require('axios');
const { User } = require('../models');
const registerLog = require('../utils/registerLog');

module.exports = {
  async createUser(req, res) {
    try {
      const {
        name,
        email,
        password,
        cep,
        number,
        complement,
        permissions,
        status
      } = req.body;

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
        complement,
        permissions,
        status
      });

      const { password: _, ...userData } = user.toJSON();

      await registerLog({
        name,
        activityType: "Cadastro de usuário",
        module: "Admin - Clientes",
        userId: user.id,
      });

      return res.status(201).json(userData);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },

  async updateUser(req, res){
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const {
      name,
      email,
      password,
      cep,
      state,
      city,
      district,
      street,
      number,
      complement,
      permissions
    } = req.body;

    await user.update({
      name,
      email,
      password,
      cep,
      state,
      city,
      district,
      street,
      number,
      complement,
      permissions
    });

    const { password: _, ...userData } = user.toJSON();

    return res.status(200).json({
      message: "Dados atualizados com sucesso.",
      user: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar usuário", error });
  }
},

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
  },

  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const { password, ...userData } = user.toJSON();
      res.json(userData);
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      res.status(500).json({ error: "Erro ao buscar perfil do usuário" });
    }
  },

  async updatePermissions(req, res) {
    const { id } = req.params;
    const { permissions } = req.body;

    if (!Array.isArray(permissions)) {
      return res.status(400).json({ message: "Permissões devem ser um array." });
    }

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      await user.update({ permissions });

      await registerLog({
        name: user.name,
        activityType: "Atualização de permissões",
        module: "Admin - Clientes",
        userId: user.id,
      });

      const { password: _, ...userData } = user.toJSON();
      return res.status(200).json({ message: "Permissões atualizadas com sucesso.", user: userData });
    } catch (error) {
      console.error("Erro ao atualizar permissões:", error);
      return res.status(500).json({ message: "Erro interno ao atualizar permissões." });
    }
  }
};
