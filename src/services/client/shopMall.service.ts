import { formatShopMall } from '~/utils/formatShopMall'

const db = require('../../models/index')

const ShopMallService = {
  GetAllShopMall: async () => {
    try {
      const response = await db.ShopMall.findAll({})
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all ShopMall.',
        total: response.length,
        response: formatShopMall(response)
      }
    } catch (error) {
      throw new Error('Failed to get all ShopMall.')
    }
  }
}

export default ShopMallService
