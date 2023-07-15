import express from 'express'
import { Router } from 'express'
import crawlController from '../../controllers/crawl/index'
require('dotenv').config()

const router: Router = express.Router()

router.get('/categoryTree', crawlController.CategoryTree)

router.get('/homeCategory', crawlController.HomeCategory)

router.get('/flashSale', crawlController.FlashSale)

router.get('/hotItems', crawlController.HotItems)

router.get('/ratings', crawlController.Ratings)

router.get('/shopInfo', crawlController.ShopInfo)

router.get('/shopDetail', crawlController.ShopDetail)

router.get('/getItem', crawlController.GetItem)

router.get('/getallcate', crawlController.CATE)

router.get('/shopMall', crawlController.ShopMall)

export default router
