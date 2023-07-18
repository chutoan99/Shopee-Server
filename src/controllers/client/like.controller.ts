import { Response } from 'express'
import { GetAllLikeService } from '../../services/client/like.service'
import { internalServerError } from '../../middleWares/handle_errors'

const LikeController = {
  GetAllLike: async (req: any, res: Response) => {
    const { userid } = req.user
    try {
      const response = await GetAllLikeService.GetAllLike(userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  AddLike: async (req: any, res: Response) => {
    const payload = req.body
    const { userid } = req.user
    try {
      const response = await GetAllLikeService.AddLike(payload, userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  DeleteLike: async (req: any, res: Response) => {
    const { itemid } = req.params
    const { userid } = req.user
    try {
      const response = await GetAllLikeService.DeleteLike(itemid, userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default LikeController
