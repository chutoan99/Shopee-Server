'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class VoucherProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VoucherProduct.hasOne(models.VoucherProduct, {
        foreignKey: 'itemid',
        as: 'voucher'
      })
    }
  }
  VoucherProduct.init(
    {
      itemid: DataTypes.BIGINT,
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
