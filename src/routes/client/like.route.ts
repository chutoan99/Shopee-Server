import express from 'express'
import LikeController from '../../controllers/client/like.controller'
import { verifyToken } from '~/middleWares/jwt'

const router = express.Router()

router.get('/', verifyToken, LikeController.GetAllLike)

router.post('/', verifyToken, LikeController.AddLike)

router.delete('/:itemid/', verifyToken, LikeController.DeleteLike)

export default router
