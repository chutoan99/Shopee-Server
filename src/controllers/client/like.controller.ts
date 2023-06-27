import { Request, Response } from 'express'
import { GetAllLikeService } from '../../services/client/like.service'
import { internalServerError } from '../../middleWares/handle_errors'

const LikeController = {
  GetAllLike: async (req: Request, res: Response) => {
    const { userid } = req.params
    try {
      const response = await GetAllLikeService.GetAllLike(userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  AddLike: async (req: Request, res: Response) => {
    const payload = req.body
    try {
      const response = await GetAllLikeService.AddLike(payload)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  DeleteLike: async (req: Request, res: Response) => {
    const { itemid, userid } = req.params
    try {
      const response = await GetAllLikeService.DeleteLike(itemid, userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default LikeController
