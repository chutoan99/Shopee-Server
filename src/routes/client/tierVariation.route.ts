import express from 'express'
import TierVariationController from '../../controllers/client/tierVariation.controller'

const router = express.Router()

router.get('/:itemid', TierVariationController.GetAllTierVariation)

export default router
