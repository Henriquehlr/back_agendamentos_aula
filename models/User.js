const { DataTypes } = require('sequelize'); // Importa os tipos de dados do Sequelize
const bcrypt = require('bcryptjs'); // Importa a biblioteca bcrypt para hash de senhas

module.exports = (sequelize) => {
  // Define o modelo User, que representa a tabela 'users' no banco de dados
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,   // Tipo string para o nome
      allowNull: false          // Campo obrigatório (não pode ser nulo)
    },
    email: {
      type: DataTypes.STRING,   // Tipo string para o email
      allowNull: false,         // Campo obrigatório
      unique: true,             // Deve ser único no banco de dados
      validate: {
        isEmail: true           // Validação para garantir formato de email válido
      }
    },
    password: {
      type: DataTypes.STRING,   // Tipo string para a senha (hash armazenado)
      allowNull: false          // Campo obrigatório
    },
    cep: {
      type: DataTypes.STRING(9), // Tipo string com tamanho máximo 9 (CEP brasileiro)
      allowNull: false           // Campo obrigatório
    },
    state: {
      type: DataTypes.STRING(2), // Tipo string de tamanho 2 (UF do estado)
      allowNull: false           // Campo obrigatório
    },
    city: {
      type: DataTypes.STRING,    // Tipo string para cidade
      allowNull: false           // Campo obrigatório
    },
    district: {
      type: DataTypes.STRING,    // Tipo string para bairro/distrito
      allowNull: false           // Campo obrigatório
    },
    street: {
      type: DataTypes.STRING,    // Tipo string para rua
      allowNull: false           // Campo obrigatório
    },
    number: {
      type: DataTypes.STRING,    // Tipo string para número (pode incluir letras, ex: 123A)
      allowNull: false           // Campo obrigatório
    },
    complement: {
      type: DataTypes.STRING,    // Tipo string para complemento (opcional)
      allowNull: true            // Campo opcional
    },
    role: {
      type: DataTypes.ENUM('client', 'admin'), // Define valores permitidos para o papel do usuário
      allowNull: false,          // Campo obrigatório
      defaultValue: 'client'     // Valor padrão é 'client'
    }
  }, {
    tableName: 'users',          // Nome explícito da tabela no banco
    hooks: {
      // Hook que executa antes de criar um novo usuário no banco
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);          // Gera um salt para o hash da senha
        user.password = await bcrypt.hash(user.password, salt); // Substitui a senha pelo hash seguro
      }
    }
  });

  return User; // Retorna o modelo User para uso externo
};
