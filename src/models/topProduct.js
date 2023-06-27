'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TopProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TopProduct.init(
    {
      data_type: DataTypes.STRING,
      count: DataTypes.INTEGER,
      name: DataTypes.STRING,
      images: DataTypes.STRING,
      sort_type: DataTypes.INTEGER,
      best_price: DataTypes.INTEGER,
      display_text: DataTypes.STRING
    },

    {
      sequelize,
      modelName: 'TopProduct'
    }
  )

  return TopProduct
}
