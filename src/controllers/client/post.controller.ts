import { Request, Response } from 'express'
import { internalServerError } from '../../middleWares/handle_errors'
import PostService from '../../services/client/post.service'

const PostController = {
  GetAllPost: async (req: Request, res: Response) => {
    try {
      const response = await PostService.GetAllPost()
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  GetPostId: async (req: Request, res: Response) => {
    const { itemid } = req.params
    try {
      const response = await PostService.GetPostId(itemid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  AddPost: async (req: Request, res: Response) => {
    const payload = req.body
    try {
      const response = await PostService.AddPost(payload)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  UpdatePost: async (req: Request, res: Response) => {
    try {
      const { itemid } = req.params
      const payload = req.body
      const response = await PostService.UpdatePost(itemid, payload)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  DeletePost: async (req: Request, res: Response) => {
    const { itemid } = req.params
    try {
      const response = await PostService.DeletePost(itemid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  }
}

export default PostController
