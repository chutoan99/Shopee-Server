import express from 'express'
import SearchSuggestionController from '../../controllers/client/searchSuggestion.controller'
const router = express.Router()

router.get('/', SearchSuggestionController.GetAllSearchSuggestion)
export default router
