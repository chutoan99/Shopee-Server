'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Overview, {
        foreignKey: 'itemid',
        targetKey: 'itemid',
        as: 'detail'
      })
    }
  }
  Cart.init(
    {
      cartid: DataTypes.BIGINT,
      userid: DataTypes.STRING,
      itemid: DataTypes.BIGINT,
      shopid: DataTypes.BIGINT,
      amount: DataTypes.INTEGER,
      option: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Cart'
    }
  )
  return Cart
}
