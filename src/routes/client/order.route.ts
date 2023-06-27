import express from 'express'
import OrderClientController from '../../controllers/client/order.controller'
const router = express.Router()

router.get('/', OrderClientController.GetAllOrder)
router.post('/', OrderClientController.AddOrder)
router.get('/user/:userid', OrderClientController.GetAllOrderOfUser)
router.put('/:orderid', OrderClientController.UpdateOrder)
router.delete('/:orderid', OrderClientController.DeleteOrder)
router.get('/:orderid', OrderClientController.GetOrderId)

export default router
