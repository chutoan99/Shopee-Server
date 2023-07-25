'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TopProduct extends Model {}
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
