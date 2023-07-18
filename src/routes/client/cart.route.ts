import express from 'express'
import CartController from '../../controllers/client/cart.controller'
import { verifyToken } from '~/middleWares/jwt'

const router = express.Router()

router.get('/', verifyToken, CartController.GetAllCart)

router.post('/', verifyToken, CartController.AddCart)

router.get('/:cartid', verifyToken, CartController.GetCartId)

router.put('/:cartid', verifyToken, CartController.UpdateCart)

router.delete('/:cartid', verifyToken, CartController.DeleteCart)

export default router
