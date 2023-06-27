import express from 'express'
import OrderController from '../../controllers/admin/order.controller'
import isShopAdmin from '../../middleWares/verify_role'
import verifyToken from '../../middleWares/verify_token'

const router = express.Router()

router.get('/', verifyToken, isShopAdmin, OrderController.GetAllOrder)
router.post('/', verifyToken, isShopAdmin, OrderController.AddOrder)
router.get('/:id', verifyToken, isShopAdmin, OrderController.GetOrderId)
router.put('/:id', verifyToken, isShopAdmin, OrderController.UpdateOrder)
router.delete('/:id', verifyToken, isShopAdmin, OrderController.DeleteOrder)

export default router
