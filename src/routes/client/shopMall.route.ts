import express from 'express'
import ShopMallController from '../../controllers/client/shopMall.controller'

const router = express.Router()

router.get('/', ShopMallController.GetAllShopMall)

export default router
