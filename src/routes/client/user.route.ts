import express from 'express'
import { Router } from 'express'
import AuthClientController from '../../controllers/client/auth.controller'
import sendEmail from '../../middleWares/sendEmail'
import passport from 'passport'
import { badRequest } from '../../middleWares/handle_errors'

require('dotenv').config()

const router: Router = express.Router()

router.post('/register', AuthClientController.Register, sendEmail)

router.post('/login', AuthClientController.Login)

router.post('/forgotPassword', sendEmail, AuthClientController.forgotPassword)

router.post('/loginGoogle', AuthClientController.loginGoogle)

router.post('/loginFacebook', AuthClientController.loginFacebook)

export default router
