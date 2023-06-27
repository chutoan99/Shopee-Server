import express from 'express'
import CommentClientController from '../../controllers/client/comment.controller'

const router = express.Router()

router.get('', CommentClientController.GetAllComment)
router.post('', CommentClientController.AddCommentId)
router.get('/:cmtid', CommentClientController.GetCommentId)
router.put('/:cmtid', CommentClientController.UpdateCommentId)
router.delete('/:cmtid', CommentClientController.DeleteCommentId)

export default router
