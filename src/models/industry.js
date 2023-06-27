"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Industry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Industry.init(
    {
      category_name: DataTypes.STRING,
      display_name: DataTypes.STRING,
      images: DataTypes.STRING,
      path_category_name: DataTypes.STRING,
      path_category_id: DataTypes.STRING,
      catid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Industry",
    }
  );
  return Industry;
};
