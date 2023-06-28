const db = require('../../models/index')

const BatchListService = {
  GetAllBatchList: async () => {
    try {
      const response = await db.BatchList.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all batchList.',
        total: response.length,
        response
      }
    } catch (error) {
      throw new Error('Failed to get all batchList.')
    }
  }
}

export default BatchListService
