import { Request, Response } from 'express'
import GetAllBanner from '../../services/client/banner.service'
import { internalServerError } from '../../middleWares/handle_errors'

const BannerController = {
  GetAllBanner: async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = await GetAllBanner.GetAllBanner()
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default BannerController
