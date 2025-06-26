module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activityType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    module: {
      type: DataTypes.STRING,
      allowNull: false
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

   Log.associate = (models) => {
    Log.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Log;
};
