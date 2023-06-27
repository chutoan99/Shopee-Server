import express from 'express'
import FlashSaleController from '../../controllers/client/flashSale.controller'

const router = express.Router()

router.get('/', FlashSaleController.GetAllFlashSale)

export default router
