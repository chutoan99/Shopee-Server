'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderid: { type: Sequelize.STRING },
      userid: { type: Sequelize.STRING },
      itemid: { type: Sequelize.BIGINT },
      shopid: { type: Sequelize.BIGINT },
      amount: { type: Sequelize.INTEGER },
      option: { type: Sequelize.STRING },
      state: { type: Sequelize.STRING },
      note: { type: Sequelize.STRING },
      shiped: { type: Sequelize.BOOLEAN },
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
    await queryInterface.dropTable('Orders')
  }
}
