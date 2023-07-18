import express, { Router } from 'express'
import OverviewController from '../../controllers/client/overview.controller'
import fileUploader from '../../config/cloudinary'

const router = express.Router()
router.get('/', OverviewController.GetAllOverview)

router.post('/', fileUploader.single('image'), OverviewController.AddOverview)

router.get('/:itemid', OverviewController.GetOverviewId)

router.delete('/:itemid', OverviewController.DeleteOverview)

router.put('/:itemid', fileUploader.single('image'), OverviewController.UpdateOverview)

export default router
