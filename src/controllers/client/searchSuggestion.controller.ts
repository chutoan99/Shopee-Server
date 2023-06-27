import { Request, Response } from 'express'
import SearchSuggestionService from '../../services/client/searchSuggestion.service'
import { internalServerError } from '../../middleWares/handle_errors'

const SearchSuggestionController = {
  GetAllSearchSuggestion: async (req: Request, res: Response) => {
    try {
      const response = await SearchSuggestionService.GetAllSearchSuggestion()
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default SearchSuggestionController
