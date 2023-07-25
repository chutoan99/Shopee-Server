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

router.put('/resetPassword', AuthClientController.resetPassword)

router.post('/refreshToken', AuthClientController.refreshAccessToken)

router.get('/logout', AuthClientController.logout)

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), AuthClientController.loginGoogle)

router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), AuthClientController.loginFacebook)

export default router
