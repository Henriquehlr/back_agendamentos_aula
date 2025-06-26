const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs'); 

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true 
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
      allowNull: true 
    },

    role: {
      type: DataTypes.ENUM('client', 'admin'),
      allowNull: false,
      defaultValue: 'client'
    },
    permissions: {
      type: DataTypes.JSON, 
      allowNull: true,
      defaultValue: [],
      validate: {
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
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(user.password, salt); 
      }
    }
  });

  return User;
};
