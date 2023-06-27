import express from 'express'
import PostController from '../../controllers/client/post.controller'

const router = express.Router()

router.get('/', PostController.GetAllPost)
router.post('/', PostController.AddPost)
router.get('/:itemid', PostController.GetPostId)
router.put('/:itemid', PostController.UpdatePost)
router.delete('/:itemid', PostController.DeletePost)

export default router
