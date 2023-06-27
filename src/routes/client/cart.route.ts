import express from 'express'
import CartController from '../../controllers/client/cart.controller'

const router = express.Router()

router.get('/:userid', CartController.GetAllCart)
router.post('/', CartController.AddCart)
router.get('/:itemid', CartController.GetCartId)
router.put('/:itemid', CartController.UpdateCart)
router.delete('/:itemid/:userid', CartController.DeleteCart)

export default router
