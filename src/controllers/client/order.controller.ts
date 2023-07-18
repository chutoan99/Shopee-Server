import { Request, Response } from 'express'
import OrderService from '../../services/client/order.service'
import { internalServerError } from '../../middleWares/handle_errors'

const OrderClientController = {
  GetAllOrder: async (req: any, res: Response) => {
    try {
      const { userid } = req.user
      const response = await OrderService.GetAllOrderOfUser(userid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  AddOrder: async (req: any, res: Response) => {
    const payload = req.body
    const { userid } = req.user
    try {
      const response = await OrderService.AddOrder(payload, userid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  UpdateOrder: async (req: any, res: Response) => {
    const payload = req.body
    const { orderid } = req.params
    const { userid } = req.user
    try {
      const response = await OrderService.UpdateOrder(orderid, payload, userid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  DeleteOrder: async (req: any, res: Response) => {
    const { orderid } = req.params
    const { userid } = req.user
    try {
      const response = await OrderService.DeleteOrder(orderid, userid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  }
}

export default OrderClientController
