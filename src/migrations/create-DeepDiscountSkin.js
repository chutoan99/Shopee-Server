'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DeepDiscountSkins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemid: { type: Sequelize.BIGINT },
      promotion_price: { type: Sequelize.STRING },
      hidden_promotion_price: { type: Sequelize.STRING },
      text: { type: Sequelize.STRING },
      start_time: { type: Sequelize.DATE },
      end_time: { type: Sequelize.DATE },
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
    await queryInterface.dropTable('DeepDiscountSkins')
  }
}
