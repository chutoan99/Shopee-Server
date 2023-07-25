'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class BatchList extends Model {}
  BatchList.init(
    {
      banner_image: DataTypes.STRING,
      title: DataTypes.STRING,
      end: DataTypes.DATE,
      start: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'BatchList'
    }
  )
  return BatchList
}
