import { Request, Response } from 'express'
import ShopService from '../../services/client/shop.service'
import { internalServerError } from '../../middleWares/handle_errors'

const ShopController = {
  GetAllShop: async (req: Request, res: Response) => {
    const query = req.query
    try {
      const response = await ShopService.GetAllShop(query)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  AddShop: async (req: Request, res: Response) => {
    const payload = req.body
    try {
      const response = await ShopService.AddShop(payload)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  GetShopID: async (req: Request, res: Response) => {
    const { shopid } = req.params
    try {
      const response = await ShopService.GetShopID(shopid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  UpdateShop: async (req: Request, res: Response) => {
    const { shopid } = req.params
    const payload = req.body
    try {
      const response = await ShopService.UpdateShop(shopid, payload)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  DeleteShop: async (req: Request, res: Response) => {
    const { shopid } = req.params
    try {
      const response = await ShopService.DeleteShop(shopid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  }
}

export default ShopController
