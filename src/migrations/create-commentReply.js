'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CommentReplies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderid: { type: Sequelize.BIGINT },
      itemid: { type: Sequelize.BIGINT },
      cmtid: { type: Sequelize.BIGINT },
      userid: { type: Sequelize.STRING },
      shopid: { type: Sequelize.BIGINT },
      comment: { type: Sequelize.STRING(1000) },
      ctime: { type: Sequelize.DATE },
      mtime: { type: Sequelize.DATE },
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
    await queryInterface.dropTable('CommentReplies')
  }
}
