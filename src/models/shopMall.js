'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ShopMall extends Model {}
  ShopMall.init(
    {
      url: DataTypes.STRING,
      image: DataTypes.STRING,
      shopid: DataTypes.BIGINT,
      promo_text: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ShopMall'
    }
  )
  return ShopMall
}
