const db = require('../../models/index')
import { Op } from 'sequelize'
import { generateCmtid } from '../../utils/gennerateNumber'
import { formatCommentsResponse } from '~/utils/formatComment'
require('dotenv').config()

interface GetAllCommentOptions {
  page?: number
  limit?: number
  order?: string
  name?: string
  price?: [number, number]
  itemid?: number
  shopid?: number
  orderid?: number
}

const CommentService = {
  GetAllComment: async ({ page, limit, order, name, price, itemid, shopid, orderid }: GetAllCommentOptions) => {
    try {
      const queries: any = { raw: true, nest: true }
      const query: any = {}
      const offset = !page || +page <= 1 ? 0 : +page - 1
      const fLimit = limit || +process.env.LIMIT!
      if (order) queries.order = [order]
      if (shopid) query.shopid = shopid
      if (itemid) query.itemid = itemid
      if (orderid) query.orderid = orderid
      if (name) query.name = { [Op.substring]: name }
      if (price) query.price = { [Op.between]: price }
      queries.offset = offset * fLimit
      queries.limit = +fLimit

      const response = await db.Comment.findAndCountAll({
        where: { ...query },
        ...queries,
        attributes: {
          exclude: ['id']
        }
      })

      const responseRepPromises = response.rows.map((item: any) =>
        db.Comment.findOne({
          where: { parent_cmtid: item.cmtid },
          attributes: {
            exclude: [
              'id',
              'like_count',
              'liked',
              'videos',
              'model_name',
              'options',
              'is_replied',
              'rating',
              'rating_star',
              'author_username',
              'author_portrait',
              'images',
              'cover',
              'status'
            ]
          }
        })
      )

      const responseReps = await Promise.all(responseRepPromises)

      const listComment = response.rows.map((item: any, index: number) => ({
        ...item,
        comment_rep: responseReps[index]
      }))

      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'cant not found..',
        page: page ? +page : 0,
        limit: limit ? +limit : +process.env.LIMIT!,
        totalPage: response.count ? Math.ceil(response.count / fLimit) : 0,
        totalItem: response.count || 0,
        response: response.count ? formatCommentsResponse(listComment) : []
      }
    } catch (error) {
      console.log(error, 'error')
      throw new Error(`Failed to gets comments`)
    }
  },

  GetCommentId: async (cmtid: any) => {
    console.log(cmtid, 'cmtid')
    try {
      const response = await db.Comment.findOne({
        where: { cmtid: cmtid },
        raw: true,
        nest: true
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get Comment id.',
        response
      }
    } catch (error) {
      throw new Error('Failed to get Comment id.')
    }
  },

  AddCommentId: async (payload: any) => {
    try {
      const response = await db.Comment.create({
        orderid: payload?.orderid,
        itemid: payload?.itemid,
        cmtid: generateCmtid(),
        rating: payload?.rating,
        userid: payload?.userid,
        shopid: payload?.shopid,
        comment: payload?.comment,
        rating_star: payload?.rating_star,
        status: payload?.status,
        author_username: payload?.author_username,
        images: payload?.images,
        videos: payload?.videos
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to add Comment.',
        response
      }
    } catch (error) {
      throw new Error('Failed to add Comment.')
    }
  },

  DeleteCommentId: async (cmtid: any) => {
    try {
      const response = await db.Comment.destroy({ where: { cmtid: cmtid } })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to delete Comment.',
        response
      }
    } catch (error) {
      throw new Error('Failed to delete Comment.')
    }
  },

  UpdateCommentId: async (cmtid: any, payload: any) => {
    try {
      const response = await db.Comment.update({ rating_star: payload?.rating_star, comment: payload?.comment }, { where: { cmtid: cmtid } })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to update Comment.',
        response
      }
    } catch (error) {
      throw new Error('Failed to update Comment.')
    }
  }
}
export default CommentService
