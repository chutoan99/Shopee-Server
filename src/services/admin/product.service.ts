const db = require('../../models/index')
const cloudinary = require('cloudinary').v2
import { Op } from 'sequelize'
import { generateItemid } from '../../utils/gennerateNumber'

const ProductService = {
  GetAllProduct: ({
    page,
    limit,
    order,
    name,
    price,
    shopid
  }: {
    page: any
    limit: any
    order: any
    name: any
    price: any
    shopid: any
  }) =>
    new Promise((resolve, reject) => {
      try {
        const queries: any = { raw: true, nest: true }
        const offset = !page || +page <= 1 ? 0 : +page - 1
        const fLimit = +limit || +process.env.LIMIT! // Provide a default value if process.env.LIMIT is undefined
        const query: any = {} // Declare and initialize the query object
        if (order) queries.order = [order]
        if (shopid) query.shopid = shopid
        if (name) query.name = { [Op.substring]: name }
        if (price) query.price = { [Op.between]: price }

        queries.offset = offset * fLimit
        queries.limit = fLimit

        const response = db.Overview.findAndCountAll({
          where: { ...query },
          ...queries
        })
        const total = Math.ceil(response.count / limit)
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'cant not found..',
          page: page ? +page : 0,
          limit: +limit ? +limit : +process.env.LIMIT!,
          totalPage: total,
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  AddProduct: (shopid: any, payload: any, fileData: any) =>
    new Promise((resolve, reject) => {
      try {
        const itemid = generateItemid()
        const response = db.Overview.create({
          itemid,
          shopid: shopid,
          name: payload?.name,
          image: fileData?.path,
          stock: +payload?.stock,
          filename: fileData?.filename,
          historical_sold: +payload?.historical_sold,
          price: +payload?.price,
          price_min: +payload?.price_min,
          price_max: +payload?.price_max,
          price_min_before_discount: +payload?.price_min_before_discount,
          price_max_before_discount: +payload?.price_max_before_discount,
          discount: payload?.discount === '' ? null : payload.discount,
          shop_rating: 5,
          catid: +payload?.catid,
          shop_name: payload?.shop_name
          // liked: payload?.liked,
          // ctime: payload?.ctime,
          // show_free_shipping: payload?.show_free_shipping,
          // is_official_shop: payload?.is_official_shop,
          // is_service_by_shopee: payload?.is_service_by_shopee,
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to add Product.',
          response
        })
        if (fileData && !response) cloudinary.uploader.destroy(fileData.filename)
      } catch (error) {
        reject(error)
        if (fileData) cloudinary.uploader.destroy(fileData.filename)
      }
    }),

  GetProductId: (itemid: any) =>
    new Promise((resolve, reject) => {
      try {
        const tier_variations = db.TierVariation.findAll({
          where: {
            itemid: itemid
          },
          attributes: { exclude: ['id', 'itemid', 'createdAt', 'updatedAt'] }
        })
        const response = db.Post.findOne({
          where: {
            itemid: itemid
          },
          raw: true,
          nest: true,
          include: [
            {
              model: db.Description,
              as: 'Descriptions',
              attributes: {
                exclude: ['id', 'itemid', 'createdAt', 'updatedAt']
              }
            },
            {
              model: db.Category,
              as: 'categories',
              attributes: {
                exclude: ['id', 'itemid', 'createdAt', 'updatedAt']
              }
            },
            {
              model: db.Video,
              as: 'video',
              attributes: {
                exclude: ['id', 'itemid', 'createdAt', 'updatedAt']
              }
            },

            {
              model: db.Attribute,
              as: 'attributes',
              attributes: {
                exclude: ['id', 'itemid', 'createdAt', 'updatedAt']
              }
            },
            {
              model: db.Shop,
              as: 'shop_info',
              attributes: {
                exclude: ['id', 'shopid', 'createdAt', 'updatedAt']
              }
            },
            {
              model: db.DeepDiscountSkin,
              as: 'deep_discount_skin',
              attributes: {
                exclude: ['id', 'itemid', 'createdAt', 'updatedAt']
              }
            },
            {
              model: db.VoucherProduct,
              as: 'voucher',
              attributes: {
                exclude: ['id', 'itemid', 'createdAt', 'updatedAt']
              }
            }
          ]
        })
        if (response.deep_discount_skin.promotion_price === null) {
          delete response['deep_discount_skin']
        }
        if (response.video.video_id === null) {
          delete response['video']
        }
        if (response.voucher.promotion_id === null) {
          delete response['voucher']
        }
        if (response.attributes.name === null) {
          delete response['attributes']
        }
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get PostId.',
          response: { ...response, tier_variations: tier_variations }
        })
      } catch (error) {
        reject(error)
      }
    }),

  UpdateProduct: (itemid: any, fileData: any, payload: any) =>
    new Promise((resolve, reject) => {
      try {
        if (fileData) {
          payload.image = fileData.path
        }
        console.log(fileData, 'fileData')
        const response = db.Overview.update(
          {
            name: payload?.name,
            image: payload?.image,
            historical_sold: payload?.historical_sold,
            price: payload?.price,
            price_min: payload?.price_min,
            stock: payload?.stock,
            price_max: payload?.price_max,
            price_min_before_discount: payload?.price_min_before_discount,
            price_max_before_discount: payload?.price_max_before_discount,
            discount: payload?.discount,
            shop_rating: payload?.shop_rating
          },
          {
            where: { itemid: itemid }
          }
        )
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'update Product success' : 'Failed to Product.',
          response
        })
        if (fileData && !response) cloudinary.uploader.destroy(fileData.filename)
      } catch (error) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename)
        reject(error)
      }
    }),

  DeleteProduct: (itemid: any, fileName: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Overview.destroy({
          where: { itemid }
        })
        cloudinary.api.delete_resources(fileName)

        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : `Failed to Delete Overview ${itemid}.`,
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}
export default ProductService
