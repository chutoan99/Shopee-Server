const db = require('../../models/index')

const SearchService = {
  GetAllSearch: async (userid: string) => {
    try {
      const response = await db.Search.findAll({
        where: { userid: userid },
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        },
        order: [['createdAt', 'DESC']], // Order by createdAt in descending order (newest first)
        limit: 10 // Limit the result to 10 items
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all Search.',
        response
      }
    } catch (error) {
      throw new Error('Failed to get all Search.')
    }
  },

  AddSearch: async (payload: any, userid: string) => {
    try {
      const response = await db.Search.create({
        userid: userid,
        text: payload.text
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to add Search.',
        response
      }
    } catch (error) {
      throw new Error('Failed to add Search.')
    }
  }
}

export default SearchService
