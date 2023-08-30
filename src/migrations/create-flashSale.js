'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FlashSales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemid: { type: Sequelize.BIGINT },
      shopid: { type: Sequelize.BIGINT },
      catid: { type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING(1000) },
      image: { type: Sequelize.STRING(1000) },
      price: { type: Sequelize.INTEGER },
      price_min: { type: Sequelize.INTEGER },
      price_max: { type: Sequelize.INTEGER },
      stock: { type: Sequelize.INTEGER },
      historical_sold: { type: Sequelize.INTEGER },
      price_min_before_discount: { type: Sequelize.INTEGER },
      price_max_before_discount: { type: Sequelize.INTEGER },
      discount: { type: Sequelize.STRING },
      shop_rating: { type: Sequelize.INTEGER },
      filename: { type: Sequelize.STRING },
      liked: { type: Sequelize.BOOLEAN },
      is_official_shop: { type: Sequelize.BOOLEAN },
      is_service_by_shopee: { type: Sequelize.BOOLEAN },
      show_free_shipping: { type: Sequelize.BOOLEAN },
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
    await queryInterface.dropTable('FlashSales')
  }
}
