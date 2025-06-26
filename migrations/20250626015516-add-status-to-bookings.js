'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Bookings', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Em análise',
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('Bookings', 'status');
  }
};
