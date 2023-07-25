'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VoucherProducts', {
      promotion_id: { type: Sequelize.BIGINT, primaryKey: true, allowNull: false },
      voucher_code: { type: Sequelize.STRING },
      label: { type: Sequelize.STRING },
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
    await queryInterface.dropTable('VoucherProducts')
  }
}
