import express from 'express'
import GetAllBatchList from '../../controllers/client/batchList.controller'
const router = express.Router()
router.get('/', GetAllBatchList.GetAllBatchList)
export default router
