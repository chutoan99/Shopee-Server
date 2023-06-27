const db = require('../../models/index')

const ShopMallService = {
  GetAllShopMall: (): Promise<any> =>
    new Promise((resolve, reject) => {
      try {
        const response = db.ShopMall.findAll({})
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all ShopMall.',
          total: response.length,
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}

export default ShopMallService
