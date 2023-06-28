import express from 'express'
import { Router } from 'express'
import UserController from '../../controllers/client/user.controller'
import verifyToken from '~/middleWares/verify_token'

require('dotenv').config()

const router: Router = express.Router()

router.get('/', UserController.GetAllUser)

router.get('/current', verifyToken, UserController.GetUserId)

router.put('/:userid', UserController.UpdateUser)

router.delete('/:userid', UserController.DeleteUser)

export default router
