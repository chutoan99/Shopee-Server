'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemid: { type: Sequelize.BIGINT },
      shopid: { type: Sequelize.BIGINT },
      currency: { type: Sequelize.STRING },
      stock: { type: Sequelize.INTEGER },
      status: { type: Sequelize.INTEGER },
      sold: { type: Sequelize.INTEGER },
      liked_count: { type: Sequelize.INTEGER },
      catid: { type: Sequelize.INTEGER },
      cmt_count: { type: Sequelize.INTEGER },
      discount: { type: Sequelize.STRING },
      raw_discount: { type: Sequelize.INTEGER },
      size_chart: { type: Sequelize.STRING },
      shop_name: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING(10000) },
      transparent_background_image: { type: Sequelize.STRING },
      images: { type: Sequelize.STRING(1000) },
      view_count: { type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING(1000) },
      image: { type: Sequelize.STRING(1000) },
      price: { type: Sequelize.INTEGER },
      price_min: { type: Sequelize.INTEGER },
      price_max: { type: Sequelize.INTEGER },
      historical_sold: { type: Sequelize.INTEGER },
      price_min_before_discount: { type: Sequelize.INTEGER },
      price_max_before_discount: { type: Sequelize.INTEGER },
      shop_rating: { type: Sequelize.INTEGER },
      filename: { type: Sequelize.STRING },
      liked: { type: Sequelize.BOOLEAN },
      ctime: { type: Sequelize.DATE },
      is_official_shop: { type: Sequelize.BOOLEAN },
      is_service_by_shopee: { type: Sequelize.BOOLEAN },
      show_free_shipping: { type: Sequelize.BOOLEAN },
      is_deep_discount_skin: { type: Sequelize.BOOLEAN },
      is_video: { type: Sequelize.BOOLEAN },
      is_voucher: { type: Sequelize.BOOLEAN },
      is_attributes: { type: Sequelize.BOOLEAN },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts')
  }
}
