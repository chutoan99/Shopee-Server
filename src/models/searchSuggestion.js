'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class SearchSuggestion extends Model {}
  SearchSuggestion.init(
    {
      text: DataTypes.STRING,
      count: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'SearchSuggestion'
    }
  )
  return SearchSuggestion
}
