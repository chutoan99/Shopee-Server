import express from 'express'
import ShopController from '../../controllers/client/shop.controller'

const router = express.Router()

router.get('/', ShopController.GetAllShop)
router.post('/', ShopController.AddShop)
router.get('/:shopid', ShopController.GetShopID)
router.put('/:shopid', ShopController.UpdateShop)
router.delete('/:shopid', ShopController.DeleteShop)

export default router
