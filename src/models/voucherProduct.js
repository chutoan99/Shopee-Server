'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class VoucherProduct extends Model {
    static associate(models) {
      VoucherProduct.hasOne(models.VoucherProduct, { foreignKey: 'promotion_id' })
    }
  }
  VoucherProduct.init(
    {
      promotion_id: DataTypes.BIGINT,
      voucher_code: DataTypes.STRING,
      label: DataTypes.STRING
    },

    {
      sequelize,
      modelName: 'VoucherProduct'
    }
  )
  return VoucherProduct
}
