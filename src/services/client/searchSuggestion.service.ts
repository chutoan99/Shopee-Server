const db = require('../../models/index')

const SearchSuggestionService = {
  GetAllSearchSuggestion: async () => {
    try {
      const response = await db.SearchSuggestion.findAll({})
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all SearchSuggestion.',
        response
      }
    } catch (error) {
      throw new Error('Failed to get all SearchSuggestion.')
    }
  }
}

export default SearchSuggestionService
