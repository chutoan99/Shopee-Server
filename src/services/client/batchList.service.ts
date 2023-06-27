const db = require('../../models/index')

const BatchListService = {
  GetAllBatchList: async (): Promise<any> => {
    new Promise((resolve, reject) => {
      try {
        const response = db.BatchList.findAll({
          attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all batchList.',
          total: response.length,
          response
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default BatchListService
