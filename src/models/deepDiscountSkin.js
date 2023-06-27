'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class DeepDiscountSkin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DeepDiscountSkin.hasOne(models.Post, {
        foreignKey: 'itemid',
        as: 'deep_discount_skin'
      })
    }
  }
  DeepDiscountSkin.init(
    {
      itemid: DataTypes.BIGINT,
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
