const db = require('../../models/index')
import { generateItemid } from '../../utils/gennerateNumber'

const PostService = {
  GetAllPost: async () => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Description, as: 'description' },
          { model: db.Category, as: ' categories' },
          { model: db.Video, as: 'video' },
          { model: db.TierVariation, as: 'tier_variations' },
          { model: db.Attribute, as: 'attributes' },
          { model: db.Shop, as: 'shop_info' },
          { model: db.DeepDiscountSkin, as: 'deep_discount_skin' },
          { model: db.VoucherProduct, as: 'voucher' }
        ]
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get Post.',
        response
      }
    } catch (error) {
      throw new Error('Failed to get Post.')
    }
  },

  GetPostId: async (itemid: any) => {
    try {
      const tier_variations = await db.TierVariation.findAll({
        where: {
          itemid: itemid
        },
        attributes: { exclude: ['id', 'itemid', 'createdAt', 'updatedAt'] }
      })
      const response = await db.Post.findOne({
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
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get PostId.',
        response: { ...response, tier_variations: tier_variations }
      }
    } catch (error) {
      throw new Error('Failed to get PostId.')
    }
  },

  UpdatePost: async (itemid: any, payload: any) => {
    try {
      const response = await db.Post.update(
        {
          currency: payload?.currency,
          stock: payload?.stock,
          status: payload?.status,
          sold: payload?.sold,
          liked_count: payload?.liked_count,
          discount: payload?.discount,
          raw_discount: payload?.raw_discount,
          size_chart: payload?.size_chart,
          shop_name: payload?.shop_name,
          transparent_background_image: payload?.transparent_background_image,
          images: payload?.images
        },
        { where: { itemid: itemid } }
      )
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to Update Post.',
        response
      }
    } catch (error) {
      throw new Error('Failed to Update PostId.')
    }
  },

  AddPost: async (payload: any) => {
    try {
      const response = await db.Post.create({
        itemid: generateItemid(),
        shopid: payload?.shopid,
        catid: payload?.catid,
        currency: payload?.currency,
        stock: payload?.stock,
        status: payload?.status,
        sold: payload?.sold,
        liked_count: payload?.liked_count,
        discount: payload?.discount,
        raw_discount: payload?.raw_discount,
        size_chart: payload?.size_chart,
        shop_name: payload?.shop_name,
        transparent_background_image: payload?.transparent_background_image,
        images: payload?.images
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to add Post.',
        response
      }
    } catch (error) {
      throw new Error('Failed to add Post.')
    }
  },

  DeletePost: async (itemid: any) => {
    try {
      const response = await db.Post.destroy({
        where: {
          itemid: itemid
        }
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to delete PostId.',
        response
      }
    } catch (error) {
      throw new Error('Failed to delete Post.')
    }
  }
}
export default PostService
