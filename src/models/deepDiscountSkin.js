'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class DeepDiscountSkin extends Model {
    static associate(models) {
      DeepDiscountSkin.hasOne(models.Post, { foreignKey: 'discountid', as: 'deep_discount_skin' })
    }
  }
  DeepDiscountSkin.init(
    {
      discountid: DataTypes.BIGINT,
      promotion_price: DataTypes.STRING,
      hidden_promotion_price: DataTypes.STRING,
      text: DataTypes.STRING,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE
    },

    {
      sequelize,
      modelName: 'DeepDiscountSkin'
    }
  )
  return DeepDiscountSkin
}
