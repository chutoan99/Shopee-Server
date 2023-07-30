'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.Industry, { foreignKey: 'catid', targetKey: 'catid', as: 'categories' })
      Post.belongsTo(models.TierVariation, { foreignKey: 'tierid', targetKey: 'tierid', as: 'tier_variations' })
      Post.belongsTo(models.Video, { foreignKey: 'video_id', targetKey: 'video_id', as: 'video' }) // done
      Post.belongsTo(models.VoucherProduct, { foreignKey: 'promotion_id', targetKey: 'promotion_id', as: 'voucher' }) // done
      Post.belongsTo(models.Attribute, { foreignKey: 'attributeid', targetKey: 'attributeid', as: 'attributes' })
      Post.belongsTo(models.Shop, { foreignKey: 'shopid', targetKey: 'shopid', as: 'shop_info' })
      Post.belongsTo(models.DeepDiscountSkin, { foreignKey: 'discountid', targetKey: 'discountid', as: 'deep_discount_skin' })
      Post.hasOne(models.Like, { foreignKey: 'itemid', as: 'likeDetail' })
      Post.hasOne(models.Cart, { foreignKey: 'itemid', as: 'overview' })
    }
  }
  Post.init(
    {
      itemid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      shopid: DataTypes.BIGINT,
      video_id: DataTypes.STRING,
      tierid: DataTypes.BIGINT,
      attributeid: DataTypes.BIGINT,
      promotion_id: DataTypes.BIGINT,
      discountid: DataTypes.BIGINT,
      currency: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      sold: DataTypes.INTEGER,
      liked_count: DataTypes.INTEGER,
      catid: DataTypes.INTEGER,
      cmt_count: DataTypes.INTEGER,
      discount: DataTypes.STRING,
      raw_discount: DataTypes.INTEGER,
      size_chart: DataTypes.STRING,
      shop_name: DataTypes.STRING,
      transparent_background_image: DataTypes.STRING,
      images: DataTypes.STRING,
      view_count: DataTypes.INTEGER,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      historical_sold: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      price_min: DataTypes.INTEGER,
      price_max: DataTypes.INTEGER,
      price_min_before_discount: DataTypes.INTEGER,
      price_max_before_discount: DataTypes.INTEGER,
      description: DataTypes.STRING,
      shop_rating: DataTypes.INTEGER,
      filename: DataTypes.STRING,
      liked: DataTypes.BOOLEAN,
      ctime: DataTypes.DATE,
      show_free_shipping: DataTypes.BOOLEAN,
      is_official_shop: DataTypes.BOOLEAN,
      is_service_by_shopee: DataTypes.BOOLEAN,
      is_deep_discount_skin: DataTypes.BOOLEAN,
      is_video: DataTypes.BOOLEAN,
      is_voucher: DataTypes.BOOLEAN,
      is_attributes: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Post'
    }
  )
  return Post
}
