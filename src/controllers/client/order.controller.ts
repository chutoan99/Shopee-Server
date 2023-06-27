import { Request, Response } from 'express'
import OrderService from '../../services/client/order.service'
import { internalServerError } from '../../middleWares/handle_errors'

const OrderClientController = {
  GetAllOrder: async (req: Request, res: Response) => {
    try {
      const query = req.query
      const response = await OrderService.GetAllOrder(query)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  GetAllOrderOfUser: async (req: Request, res: Response) => {
    try {
      const { userid } = req.params

      const response = await OrderService.GetAllOrderOfUser(userid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  GetOrderId: async (req: Request, res: Response) => {
    const { orderid } = req.params
    try {
      const response = await OrderService.GetOrderId(orderid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  AddOrder: async (req: Request, res: Response) => {
    const payload = req.body
    try {
      const response = await OrderService.AddOrder(payload)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  UpdateOrder: async (req: Request, res: Response) => {
    const payload = req.body
    const { orderid } = req.params
    try {
      const response = await OrderService.UpdateOrder(orderid, payload)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  DeleteOrder: async (req: Request, res: Response) => {
    const { orderid } = req.params
    try {
      const response = await OrderService.DeleteOrder(orderid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  }
}

export default OrderClientController
