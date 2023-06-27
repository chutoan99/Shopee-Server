import express from 'express'
import CommentController from '../../controllers/admin/comment.controller'
import isShopAdmin from '../../middleWares/verify_role'
import verifyToken from '../../middleWares/verify_token'

const router = express.Router()

router.get('/', verifyToken, isShopAdmin, CommentController.GetAllComment)
router.post('/', verifyToken, isShopAdmin, CommentController.AddComment)
router.get('/:id', verifyToken, isShopAdmin, CommentController.GetCommentId)
router.put('/:id', verifyToken, isShopAdmin, CommentController.UpdateComment)
router.delete('/:id', verifyToken, isShopAdmin, CommentController.DeleteComment)

export default router
