import ShopMallService from '../../services/client/shopMall.service'
import { internalServerError } from '../../middleWares/handle_errors'
import { Request, Response } from 'express'

const ShopMallController = {
  GetAllShopMall: async (req: Request, res: Response) => {
    try {
      const response = await ShopMallService.GetAllShopMall()
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default ShopMallController
