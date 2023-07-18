import { Router } from 'express'
import TopProductController from '../../controllers/client/topProduct.controller'

const router: Router = Router()

router.get('/', TopProductController.GetAllTopProduct)

export default router
