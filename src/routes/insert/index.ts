import express from 'express'
import { Router } from 'express'
import InsertControllers from '../../controllers/insert/index'
require('dotenv').config()

const router: Router = express.Router()

router.post('/insert', InsertControllers.Insert)

router.post('/app', InsertControllers.App)

router.post('/comment/:start/:end', InsertControllers.Comment)

router.post('/post/:start/:end', InsertControllers.Post)

router.post('/shop/:start/:end', InsertControllers.Shop)

router.post('/industry', InsertControllers.Industries)

export default router
