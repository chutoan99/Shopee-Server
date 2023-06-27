import express from 'express'
import LikeController from '../../controllers/client/like.controller'

const router = express.Router()

router.get('/:userid', LikeController.GetAllLike)
router.post('/', LikeController.AddLike)
router.delete('/:itemid/:userid', LikeController.DeleteLike)

export default router
