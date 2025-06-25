const { DataTypes } = require('sequelize'); // Tipos do Sequelize (string, boolean, json, etc.)
const bcrypt = require('bcryptjs'); // Lib para hash seguro de senhas

module.exports = (sequelize) => {
  // Define o modelo 'User' (tabela 'users' no banco de dados)
  const User = sequelize.define('User', {
    // Nome do usuário
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Email único e obrigatório
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true // Verifica formato de email válido
      }
    },
    // Senha (será armazenada com hash)
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Endereço: CEP, estado, cidade, bairro, rua, número e complemento
    cep: {
      type: DataTypes.STRING(9),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: true // Campo opcional
    },
    // Papel do usuário (cliente ou admin)
    role: {
      type: DataTypes.ENUM('client', 'admin'),
      allowNull: false,
      defaultValue: 'client'
    },
    // Permissões do usuário (Agendamentos, Logs)
    permissions: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: ['Agendamentos'], // Permissão padrão
      validate: {
        // Valida que todas permissões são válidas
        isValidPermissions(value) {
          const valid = ['Agendamentos', 'Logs'];
          if (!Array.isArray(value)) {
            throw new Error('Permissões devem ser uma lista.');
          }
          for (const perm of value) {
            if (!valid.includes(perm)) {
              throw new Error(`Permissão inválida: ${perm}`);
            }
          }
        }
      }
    },
    // Status ativo/inativo do usuário
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'users',
    hooks: {
      // Antes de criar o usuário, faz o hash da senha
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10); // Gera salt aleatório
        user.password = await bcrypt.hash(user.password, salt); // Aplica hash
      }
    }
  });

  return User; // Exporta o modelo para ser usado no app
};
