'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TopProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data_type: { type: Sequelize.STRING },
      count: { type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      images: { type: Sequelize.STRING },
      sort_type: { type: Sequelize.INTEGER },
      best_price: { type: Sequelize.INTEGER },
      display_text: { type: Sequelize.STRING },
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
    await queryInterface.dropTable('TopProducts')
  }
}
