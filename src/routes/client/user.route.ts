import express from 'express'
import { Router } from 'express'
import UserController from '../../controllers/client/user.controller'
import { verifyToken } from '~/middleWares/jwt'

require('dotenv').config()

const router: Router = express.Router()

// router.get('/', UserController.GetAllUser)

router.get('/current', verifyToken, UserController.GetUserId)

router.put('/', verifyToken, UserController.UpdateUser)

router.delete('/', verifyToken, UserController.DeleteUser)

export default router
