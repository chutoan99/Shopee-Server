'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Overview, {
        foreignKey: 'itemid',
        targetKey: 'itemid',
        as: 'orderDetail'
      })
      Order.belongsTo(models.User, {
        foreignKey: 'userid',
        targetKey: 'userid',
        as: 'user'
      })
      Order.belongsTo(models.TierVariation, {
        foreignKey: 'itemid',
        targetKey: 'itemid',
        as: 'tier_variations_order'
      })
    }
  }
  Order.init(
    {
      orderid: DataTypes.BIGINT,
      userid: DataTypes.STRING,
      itemid: DataTypes.BIGINT,
      shopid: DataTypes.BIGINT,
      amount: DataTypes.INTEGER,
      option: DataTypes.STRING,
      state: DataTypes.STRING,
      type: DataTypes.INTEGER,
      note: DataTypes.STRING,
      shiped: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Order'
    }
  )
  return Order
}
