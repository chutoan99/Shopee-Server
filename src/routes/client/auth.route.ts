const express = require('express')
const router = express.Router()

import AuthClientController from '../../controllers/client/auth.controller'
import sendEmail from '../../middleWares/sendEmail'
import passport from 'passport'
import { badRequest } from '../../middleWares/handle_errors'

require('dotenv').config()

router.post('/register', AuthClientController.Register, sendEmail)

router.post('/login', AuthClientController.Login)

router.post('/forgotPassword', AuthClientController.forgotPassword)

router.post('/sendEmail', sendEmail)

router.post('/loginGoogle', AuthClientController.loginGoogle)

router.post('/loginFacebook', AuthClientController.loginFacebook)

export default router
