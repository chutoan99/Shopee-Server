'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HomeCategories', {
      display_name: { type: Sequelize.STRING },
      catid: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      parent_catid: { type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      image: { type: Sequelize.STRING(1000) },
      unselected_image: { type: Sequelize.STRING },
      selected_image: { type: Sequelize.STRING },
      level: { type: Sequelize.INTEGER },
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
    await queryInterface.dropTable('HomeCategories')
  }
}
