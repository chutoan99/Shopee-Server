import CommentService from '../../services/client/comment.service'
import { internalServerError } from '../../middleWares/handle_errors'
import { Request, Response } from 'express'

const CommentController = {
  GetAllComment: async (req: Request, res: Response) => {
    try {
      const query = req.query
      CommentService.GetAllComment({ ...query }).then((response: any) => {
        res.status(200).json(response)
      })
    } catch (error) {
      internalServerError(res)
    }
  },

  GetCommentId: async (req: Request, res: Response) => {
    const { cmtid } = req.params
    try {
      const response = await CommentService.GetCommentId(cmtid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  AddCommentId: async (req: Request, res: Response) => {
    const payload = req.body
    try {
      const response = await CommentService.AddCommentId(payload)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  DeleteCommentId: async (req: Request, res: Response) => {
    const { cmtid } = req.params
    try {
      const response = await CommentService.DeleteCommentId(cmtid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  UpdateCommentId: async (req: Request, res: Response) => {
    const { cmtid } = req.params
    const payload = req.body
    try {
      const response = await CommentService.UpdateCommentId(cmtid, payload)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default CommentController
