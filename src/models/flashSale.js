'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class FlashSale extends Model {}
  FlashSale.init(
    {
      itemid: DataTypes.BIGINT,
      shopid: DataTypes.BIGINT,
      catid: DataTypes.BIGINT,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      historical_sold: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      price_min: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      price_max: DataTypes.INTEGER,
      price_min_before_discount: DataTypes.INTEGER,
      price_max_before_discount: DataTypes.INTEGER,
      discount: DataTypes.STRING,
      shop_rating: DataTypes.INTEGER,
      filename: DataTypes.STRING,
      liked: DataTypes.BOOLEAN,
      show_free_shipping: DataTypes.BOOLEAN,
      is_official_shop: DataTypes.BOOLEAN,
      is_service_by_shopee: DataTypes.BOOLEAN,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'FlashSale'
    }
  )
  return FlashSale
}
