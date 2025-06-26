const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Room = sequelize.define("Room", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scheduleTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeBlock: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  return Room;
};
