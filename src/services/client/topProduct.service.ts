const db = require('../../models/index')

const TopProductService = {
  GetAllTopProduct: async () => {
    try {
      const response = await db.TopProduct.findAll({})
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all TopProduct.',
        response
      }
    } catch (error) {
      throw new Error('Failed to get all TopProduct.')
    }
  }
}
export default TopProductService
