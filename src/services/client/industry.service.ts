import dotenv from 'dotenv'
dotenv.config()
const db = require('../../models/index')
const GetAllIndustryService = {
  GetAllIndustry: () => {
    new Promise((resolve, reject) => {
      try {
        const response = db.Industry.findAll({
          attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'images'] }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all Industry.',
          total: response.length,
          response
        })
      } catch (error) {
        reject(error)
      }
    })
  },

  GetAllIndustryWithCategory: async ({
    page,
    limit,
    category_name
  }: {
    page: number
    limit: number
    category_name: any
  }) => {
    new Promise((resolve, reject) => {
      try {
        console.log(page, limit, category_name)
        const response = db.Industry.findAll({
          where: { display_name: category_name }
        })

        const catid = response[0]._previousDataValues.catid
        const queries: any = {}
        page < 1 && page === 1
        const offset = !page || +page <= 1 ? 0 : +page - 1
        const fLimit = +limit || process.env.LIMIT || 10 // Set a default value if process.env.LIMIT is undefined
        // queries.offset = offset * fLimit;
        // queries.limit = fLimit;
        queries.catid = catid
        const xx = { ...queries }
        const response2 = db.Overview.findAndCountAll({
          where: xx
          // raw: true,
          // nest: true,
        })
        const total = Math.ceil(response2.count / +fLimit)
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all Industry.',
          page: page ? +page : 0,
          limit: +limit ? +limit : process.env.LIMIT || 10, // Set a default value if limit is undefined
          totalPage: total,
          response: response2
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
export { GetAllIndustryService }
