import dotenv from 'dotenv'
dotenv.config()
const db = require('../../models/index')

const GetAllIndustryService = {
  GetAllIndustry: async () => {
    try {
      const response = await db.Industry.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'images'] }
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all Industry.',
        total: response.length,
        response
      }
    } catch (error) {
      console.log(error)
    }
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
    try {
      const response = await db.Industry.findAll({
        where: { display_name: category_name }
      })

      const catid = response[0].catid
      const queries: any = {}
      // page < 1 && page === 1
      const offset = !page || +page <= 1 ? 0 : +page - 1
      const fLimit = +limit || process.env.LIMIT || 10 // Set a default value if process.env.LIMIT is undefined
      queries.offset = offset * +fLimit
      queries.limit = fLimit
      queries.catid = catid

      console.log(queries, 'queries')
      const response2 = await db.Overview.findAndCountAll({
        where: { ...queries }
        // raw: true,
        // nest: true,
      })
      const total = Math.ceil(response2.count / +fLimit)
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all Industry.',
        page: page ? +page : 0,
        limit: +limit ? +limit : process.env.LIMIT || 10, // Set a default value if limit is undefined
        totalPage: total,
        response: response2
      }
    } catch (error) {
      console.log(error)
    }
  }
}
export default GetAllIndustryService
