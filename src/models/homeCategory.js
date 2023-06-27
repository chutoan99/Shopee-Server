"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HomeCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HomeCategory.init(
    {
      catid: DataTypes.BIGINT,
      parent_catid: DataTypes.INTEGER,
      name: DataTypes.STRING,
      display_name: DataTypes.STRING,
      image: DataTypes.STRING,
      unselected_image: DataTypes.STRING,
      selected_image: DataTypes.STRING,
      level: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "HomeCategory",
    }
  );
  return HomeCategory;
};
