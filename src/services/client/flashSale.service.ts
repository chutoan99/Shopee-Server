const db = require('../../models/index')

const FlashSaleService = {
  GetAllFlashSale: async () => {
    try {
      const response = await db.FlashSale.findAll({})
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all FlashSale.',
        total: response.length,
        response
      }
    } catch (error) {
      throw new Error('Failed to get all FlashSale.')
    }
  }
}

export default FlashSaleService
