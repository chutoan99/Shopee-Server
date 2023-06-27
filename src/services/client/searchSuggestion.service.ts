const db = require('../../models/index')

const SearchSuggestionService = {
  GetAllSearchSuggestion: () =>
    new Promise((resolve, reject) => {
      try {
        const response = db.SearchSuggestion.findAll({})
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all SearchSuggestion.',
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}

export default SearchSuggestionService
