import express from 'express'

import UserProfileController from '../../controllers/admin/user.controller'
import { verifyToken, isShopAdmin } from '../../middleWares/jwt'

const router = express.Router()

router.get('/account', verifyToken, isShopAdmin, UserProfileController.GetProfile)

router.put('/account', verifyToken, isShopAdmin, UserProfileController.UpdateProfile)

router.get('/shop', verifyToken, isShopAdmin, UserProfileController.GetShop)

router.put('/shop', verifyToken, isShopAdmin, UserProfileController.UpdateShop)

export default router
