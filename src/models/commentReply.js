"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommentReply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommentReply.hasOne(models.CommentReply, {
        foreignKey: "itemid",
        as: "CommentReply",
      });
    }
  }
  CommentReply.init(
    {
      orderid: DataTypes.BIGINT,
      itemid: DataTypes.BIGINT,
      cmtid: DataTypes.BIGINT,
      userid: DataTypes.STRING,
      shopid: DataTypes.BIGINT,
      comment: DataTypes.STRING,
      ctime: DataTypes.DATE,
      mtime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "CommentReply",
    }
  );
  return CommentReply;
};
