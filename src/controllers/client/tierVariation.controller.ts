import { Request, Response } from 'express'
import TierVariationService from '../../services/client/tierVariation.service'
import { internalServerError } from '../../middleWares/handle_errors'

const TierVariationController = {
  GetAllTierVariation: async (req: Request, res: Response) => {
    try {
      const { itemid } = req.params
      const response = await TierVariationService.GetAllTierVariation(itemid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}
export default TierVariationController
