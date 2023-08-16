const db = require('../../models/index')

const ShopService = {
  GetItems: async (shopid: any) => {
    try {
      const response = await db.Post.findAll({
        where: { shopid: shopid },
        attributes: [
          'itemid',
          'shopid',
          'catid',
          'name',
          'image',
          'historical_sold',
          'price',
          'price_min',
          'stock',
          'price_max',
          'price_before_discount',
          'price_min_before_discount',
          'price_max_before_discount',
          'discount',
          'shop_rating',
          'filename',
          'shop_name',
          'liked',
          'ctime',
          'show_free_shipping',
          'is_official_shop',
          'is_service_by_shopee'
        ]
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get item shop',
        total: response.length,
        response
      }
    } catch (error) {
      throw new Error('Failed to get shop Id.')
    }
  },

  GetShopID: async (shopid: any) => {
    try {
      const response = await db.Shop.findOne({ where: { shopid: shopid } })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get shop Id.',
        response
      }
    } catch (error) {
      throw new Error('Failed to get shop Id.')
    }
  }
}

export default ShopService
