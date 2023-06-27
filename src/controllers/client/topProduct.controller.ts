import { Request, Response } from 'express'
import TopProductService from '../../services/client/topProduct.service'
import { internalServerError } from '../../middleWares/handle_errors'

const TopProductController = {
  GetAllTopProduct: async (req: Request, res: Response) => {
    try {
      const response = await TopProductService.GetAllTopProduct()
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default TopProductController
