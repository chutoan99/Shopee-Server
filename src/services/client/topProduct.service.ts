const db = require('../../models/index')

const TopProductService = {
  GetAllTopProduct: () =>
    new Promise((resolve, reject) => {
      try {
        const response = db.TopProduct.findAll({})
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'cant not found..',
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}
export default TopProductService
