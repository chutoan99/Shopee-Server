'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Video.hasOne(models.Video, {
        foreignKey: 'itemid',
        as: 'video'
      })
    }
  }
  Video.init(
    {
      itemid: DataTypes.BIGINT,
      video_id: DataTypes.STRING,
      thumb_url: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      version: DataTypes.INTEGER,
      width: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      defn: DataTypes.STRING,
      profile: DataTypes.STRING,
      url: DataTypes.STRING
    },

    {
      sequelize,
      modelName: 'Video'
    }
  )
  return Video
}
