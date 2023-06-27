import express from 'express'
import fileUploader from '../../middleWares/cloudinary'
import ProductController from '../../controllers/admin/product.controller'
import isShopAdmin from '../../middleWares/verify_role'
import verifyToken from '../../middleWares/verify_token'

const router = express.Router()

router.get('/', verifyToken, isShopAdmin, ProductController.GetAllProduct)

router.post('/', verifyToken, isShopAdmin, fileUploader.single('image'), ProductController.AddProduct)

router.get('/:itemid', verifyToken, isShopAdmin, ProductController.GetProductId)

router.put('/:itemid', verifyToken, isShopAdmin, fileUploader.single('image'), ProductController.UpdateProduct)

router.delete('/:itemid', verifyToken, isShopAdmin, ProductController.DeleteProduct)

export default router
