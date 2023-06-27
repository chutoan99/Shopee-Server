'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      sex: { type: Sequelize.STRING },
      userid: { type: Sequelize.STRING },
      shopid: { type: Sequelize.BIGINT },
      password: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      address: { type: Sequelize.STRING },
      birthday: { type: Sequelize.STRING },
      phone: { type: Sequelize.BIGINT },
      avatar: { type: Sequelize.STRING },
      role: { type: Sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
}
