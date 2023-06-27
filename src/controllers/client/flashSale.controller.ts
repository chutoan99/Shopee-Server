import { Request, Response } from 'express'
import FlashSaleService from '../../services/client/flashSale.service'
import { internalServerError } from '../../middleWares/handle_errors'

const FlashSaleController = {
  GetAllFlashSale: async (req: Request, res: Response) => {
    try {
      const response = await FlashSaleService.GetAllFlashSale()
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default FlashSaleController
