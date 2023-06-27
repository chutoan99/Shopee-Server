const db = require('../../models/index')

const CategoriesTreeService = {
  GetAllCategoriesTree: (level: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.HomeCategory.findAll({
          where: {
            level: level
          }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all  Categories tree',
          total: response.length,
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  GetAllCategoriesParent: (catid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.HomeCategory.findAll({
          where: {
            parent_catid: catid
          }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all  Categories tree',
          total: response.length,
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}
export default CategoriesTreeService
