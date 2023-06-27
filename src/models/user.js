'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasOne(models.User, {
      //   foreignKey: "userid",
      //   as: "Users",
      // });
      User.hasOne(models.Order, {
        foreignKey: 'userid',
        as: 'user'
      })
    }
  }
  User.init(
    {
      sex: DataTypes.STRING,
      role: DataTypes.STRING,
      userid: DataTypes.STRING,
      shopid: DataTypes.BIGINT,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      birthday: DataTypes.STRING,
      phone: DataTypes.BIGINT,
      avatar: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
