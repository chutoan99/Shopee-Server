'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Industries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_name: { type: Sequelize.STRING },
      display_name: { type: Sequelize.STRING },
      images: { type: Sequelize.STRING(10000) },
      path_category_name: { type: Sequelize.STRING },
      path_category_id: { type: Sequelize.STRING },
      catid: { type: Sequelize.INTEGER },
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
    await queryInterface.dropTable('Industries')
  }
}
