import express from 'express'
import OrderClientController from '../../controllers/client/order.controller'
import { verifyToken } from '~/middleWares/jwt'
const router = express.Router()

// router.get('/', verifyToken, OrderClientController.GetAllOrder)

router.post('/', verifyToken, OrderClientController.AddOrder)

router.get('/', verifyToken, OrderClientController.GetAllOrder)

router.put('/:orderid', verifyToken, OrderClientController.UpdateOrder)

router.delete('/:orderid', verifyToken, OrderClientController.DeleteOrder)

// router.get('/:orderid', OrderClientController.GetOrderId)

export default router
