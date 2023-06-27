"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BatchList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BatchList.init(
    {
      banner_image: DataTypes.STRING,
      title: DataTypes.STRING,
      end: DataTypes.DATE,
      start: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "BatchList",
    }
  );
  return BatchList;
};
