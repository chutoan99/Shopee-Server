import { Request, Response } from 'express'
import CartService from '../../services/client/cart.service'
import { internalServerError } from '../../middleWares/handle_errors'

const CartController = {
  GetAllCart: async (req: Request, res: Response) => {
    const { userid } = req.params

    try {
      const response = await CartService.GetAllCart(userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  GetCartId: async (req: Request, res: Response) => {
    const { itemid } = req.params
    try {
      const response = await CartService.GetCartId(itemid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  AddCart: async (req: Request, res: Response) => {
    const payload = req.body
    try {
      const response = await CartService.AddCart(payload)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  UpdateCart: async (req: Request, res: Response) => {
    const payload = req.body
    const { itemid } = req.params
    try {
      const response = await CartService.UpdateCart(itemid, payload)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  DeleteCart: async (req: Request, res: Response) => {
    const { itemid, userid } = req.params
    const { payload } = req.body
    try {
      const response = await CartService.DeleteCart(itemid, userid, payload)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default CartController
