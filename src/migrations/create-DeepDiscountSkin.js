'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DeepDiscountSkins', {
      discountid: { type: Sequelize.BIGINT, primaryKey: true, allowNull: false },
      promotion_price: { type: Sequelize.STRING },
      hidden_promotion_price: { type: Sequelize.STRING },
      text: { type: Sequelize.STRING },
      start_time: { type: Sequelize.DATE },
      end_time: { type: Sequelize.DATE },
      id: { type: Sequelize.INTEGER },
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
