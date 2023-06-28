const db = require('../../models/index')

const ShopService = {
  GetAllShop: async (query: any) => {
    try {
      const queries = { ...query }
      const response = await db.Shop.findAll({ where: queries })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get shop.',
        response
      }
    } catch (error) {
      throw new Error('Failed to get shop.')
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
  },

  UpdateShop: async (shopid: any, payload: any) => {
    try {
      const response = await db.Shop.update(
        {
          is_official_shop: payload?.is_official_shop,
          item_count: payload?.item_count,
          rating_star: payload?.rating_star,
          name: payload?.name,
          shop_location: payload?.shop_location,
          username: payload?.username,
          portrait: payload?.portrait,
          place: payload?.place,
          description: payload.description
        },
        { where: { shopid: shopid } }
      )
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to update shop.',
        response
      }
    } catch (error) {
      throw new Error('Failed to update shop.')
    }
  },

  AddShop: async (payload: any) => {
    try {
      const response = await db.Shop.create({
        shopid: payload?.shopid,
        userid: payload?.userid,
        is_official_shop: payload?.is_official_shop,
        item_count: payload?.item_count,
        rating_star: payload?.rating_star,
        name: payload?.name,
        follower_count: payload?.follower_count,
        rating_bad: payload?.rating_bad,
        rating_good: payload?.rating_good,
        rating_normal: payload?.rating_normal,
        status: payload?.status,
        shop_location: payload?.shop_location,
        username: payload?.username,
        portrait: payload?.portrait,
        place: payload?.place,
        response_time: payload?.response_time
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to ADD shop.',
        response
      }
    } catch (error) {
      throw new Error('Failed to ADD shop.')
    }
  },

  DeleteShop: async (shopid: any) => {
    try {
      const response = await db.Shop.destroy({ where: { shopid: shopid } })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to delete shop.',
        response
      }
    } catch (error) {
      throw new Error('Failed to delete shop.')
    }
  }
}

export default ShopService
