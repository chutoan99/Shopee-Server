'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.CommentReply, {
        foreignKey: 'itemid', //khoa1 phu5
        targetKey: 'itemid',
        as: 'CommentReply'
      })
    }
  }
  Comment.init(
    {
      orderid: DataTypes.BIGINT,
      itemid: DataTypes.BIGINT,
      userid: DataTypes.STRING,
      shopid: DataTypes.BIGINT,
      cmtid: DataTypes.BIGINT,
      rating: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      rating_star: DataTypes.INTEGER,
      like_count: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      author_username: DataTypes.STRING,
      author_portrait: DataTypes.STRING,
      images: DataTypes.TEXT,
      cover: DataTypes.STRING,
      videos: DataTypes.TEXT,
      model_name: DataTypes.STRING,
      options: DataTypes.TEXT,
      liked: DataTypes.BOOLEAN,
      mtime: DataTypes.DATE,
      ctime: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Comment'
    }
  )
  return Comment
}
