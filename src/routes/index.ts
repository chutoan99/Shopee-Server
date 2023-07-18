import { Express } from 'express'
//? CLIENT
import IndustryRoute from './client/Industry.route'
import BannerRoute from './client/banner.route'
import BatchListRoute from './client/batchList.route'
import shopMallRoute from './client/shopMall.route'
import NotificationRoute from './client/notification.route'
import searchSuggestionRoute from './client/searchSuggestion.route'
import flashSaleRoute from './client/flashSale.route'
import LikeRoute from './client/like.route'
import PostRoute from './client/post.route'
import ShopRoute from './client/shop.route'
import CartRoute from './client/cart.route'
import UserRoute from './client/user.route'
import CommentClientRoute from './client/comment.route'
import AuthClientRoute from './client/auth.route'
import CategoryTreeRoute from './client/categoryTree.route'
import OverviewRoute from './client/overview.route'
import OrderClientRoute from './client/order.route'
import TopProductRoute from './client/topProduct.route'
//? ADMIN
import ProductRoute from './admin/product.route'
import CommentRoute from './admin/comment.route'
import OrderRoute from './admin/order.route'
import AuthRoute from './admin/auth.route'
import UserProfileRoute from './admin/userProfile.route'
import swaggerUi from 'swagger-ui-express'
import swaggerClientDocument from '../config/swaggerClient.json'
import swaggerAdminDocument from '../config/swaggerAdmin.json'
//? INSERT
import InsertRoute from './insert/index'
//? CRAWL
import CrawlRoute from './crawl/index'

const serveSwaggerClient = swaggerUi.serveFiles(swaggerClientDocument)
const serveSwaggerAdmin = swaggerUi.serveFiles(swaggerAdminDocument)

const initRoutes = (app: Express) => {
  //? CLIENT
  app.use('/api/client/auth', AuthClientRoute)
  app.use('/api/client/banner', BannerRoute)
  app.use('/api/client/batchList', BatchListRoute)
  app.use('/api/client/cart', CartRoute)
  app.use('/api/client/categoryTree', CategoryTreeRoute)
  app.use('/api/client/comment', CommentClientRoute)
  app.use('/api/client/flashSale', flashSaleRoute)
  app.use('/api/client/industry', IndustryRoute)
  app.use('/api/client/like', LikeRoute)
  app.use('/api/client/notification', NotificationRoute)
  app.use('/api/client/order', OrderClientRoute)
  app.use('/api/client/overview', OverviewRoute)
  app.use('/api/client/post', PostRoute)
  app.use('/api/client/searchSuggestion', searchSuggestionRoute)
  app.use('/api/client/shop', ShopRoute)
  app.use('/api/client/shopMall', shopMallRoute)
  app.use('/api/client/topProduct', TopProductRoute)
  app.use('/api/client/user', UserRoute)
  //? ADMIN
  app.use('/api/admin/product', ProductRoute)
  app.use('/api/admin/comment', CommentRoute)
  app.use('/api/admin/order', OrderRoute)
  app.use('/api/admin/auth', AuthRoute)
  app.use('/api/admin/userInfo', UserProfileRoute)
  //? INSERT
  // app.use('/api/insert', InsertRoute)
  //? CRAWL
  // app.use('/api/crawl', CrawlRoute)
  // Middleware for /api-docs-admin , /api-docs-client

  app.use('/api/client/docs', serveSwaggerClient, swaggerUi.setup(swaggerClientDocument))
  app.use('/api/admin/docs', serveSwaggerAdmin, swaggerUi.setup(swaggerAdminDocument))

  // * If the route does not match any of the above, fall back to this route
  return app.use('/', (req, res) => {
    res.send('server on...')
  })
}

export default initRoutes
