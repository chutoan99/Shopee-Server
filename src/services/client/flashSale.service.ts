const db = require('../../models/index')

const FlashSaleService = {
  GetAllFlashSale: () =>
    new Promise((resolve, reject) => {
      try {
        const response = db.FlashSale.findAll({})
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all FlashSale.',
          total: response.length,
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}

export default FlashSaleService
