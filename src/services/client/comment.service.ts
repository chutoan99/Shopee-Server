const db = require('../../models/index')
import { generateCmtid } from '../../utils/gennerateNumber'

require('dotenv').config()

const CommentService = {
  GetAllComment: async (query: any) => {
    try {
      const queries = { ...query }
      const response = await db.Comment.findAll({
        where: queries,
        include: [
          {
            model: db.CommentReply,
            as: 'CommentReply'
          }
        ]
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get Comment.',
        response
      }
    } catch (error) {
      throw new Error('Failed to get Comment.')
    }
  },

  GetCommentId: async (cmtid: any) => {
    try {
      const response = await db.Comment.findOne({
        where: { cmtid: cmtid },
        include: [
          {
            model: db.CommentReply,
            as: 'CommentReply'
          }
        ]
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
