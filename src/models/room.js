'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {}
  Room.init(
    {
      roomid: DataTypes.INTEGER,
      shopid: DataTypes.BIGINT,
      userid: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Room'
    }
  )
  return Room
}
