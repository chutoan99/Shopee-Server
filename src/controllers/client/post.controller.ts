import { Request, Response } from 'express'
import { internalServerError } from '../../middleWares/handle_errors'
import PostService from '../../services/client/post.service'

const PostController = {
  GetPosts: async (req: Request, res: Response) => {
    try {
      const query = req.query
      const response = await PostService.GetPosts(query)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  SearchPosts: async (req: Request, res: Response) => {
    try {
      const query = req.query
      const response = await PostService.SearchPots(query)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  GetPost: async (req: Request, res: Response) => {
    const { itemid } = req.params
    try {
      const response = await PostService.GetPost(itemid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  }

  // AddPost: async (req: Request, res: Response) => {
  //   const payload = req.body
  //   try {
  //     const response = await PostService.CreatePost(payload)
  //     return res.status(200).json(response)
  //   } catch (error) {
  //     internalServerError(res)
  //   }
  // },

  // UpdatePost: async (req: Request, res: Response) => {
  //   try {
  //     const { itemid } = req.params
  //     const payload = req.body
  //     const response = await PostService.UpdatePost(itemid, payload)
  //     return res.status(200).json(response)
  //   } catch (error) {
  //     internalServerError(res)
  //   }
  // },

  // DeletePost: async (req: Request, res: Response) => {
  //   const { itemid } = req.params
  //   try {
  //     const response = await PostService.DeletePost(itemid)
  //     return res.status(200).json(response)
  //   } catch (error) {
  //     internalServerError(res)
  //   }
  // }
}

export default PostController
