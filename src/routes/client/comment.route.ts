import express from 'express'
import CommentController from '../../controllers/client/comment.controller'

const router = express.Router()

router.get('', CommentController.GetAllComment)

router.post('', CommentController.AddCommentId)

router.get('/:cmtid', CommentController.GetCommentId)

router.put('/:cmtid', CommentController.UpdateCommentId)

router.delete('/:cmtid', CommentController.DeleteCommentId)

export default router
