const db = require('../../models/index')

const ShopService = {
  GetAllShop: (query: any) =>
    new Promise((resolve, reject) => {
      const queries = { ...query }
      try {
        const response = db.Shop.findAll({
          where: queries
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get shop.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  GetShopID: (shopid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Shop.findOne({
          where: { shopid: shopid }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get shop Id.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  UpdateShop: (shopid: any, payload: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Shop.update(
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
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to update shop.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  AddShop: (payload: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Shop.create({
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
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to ADD shop.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  DeleteShop: (shopid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Shop.destroy({ where: { shopid: shopid } })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to delete shop.',
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}

export default ShopService
