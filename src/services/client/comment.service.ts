const db = require('../../models/index')
import { generateCmtid } from '../../utils/gennerateNumber'

require('dotenv').config()

const CommentService = {
  GetAllComment: (query: any) =>
    new Promise((resolve, reject) => {
      const queries = { ...query }
      try {
        const response = db.Comment.findAll({
          where: queries,
          include: [
            {
              model: db.CommentReply,
              as: 'CommentReply'
            }
          ]
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get Comment.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  GetCommentId: (cmtid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Comment.findOne({
          where: { cmtid: cmtid },
          include: [
            {
              model: db.CommentReply,
              as: 'CommentReply'
            }
          ]
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get Comment id.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  AddCommentId: (payload: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Comment.create({
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
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to add Comment.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  DeleteCommentId: (cmtid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Comment.destroy({ where: { cmtid: cmtid } })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to delete Comment.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  UpdateCommentId: (cmtid: any, payload: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Comment.update(
          { rating_star: payload?.rating_star, comment: payload?.comment },
          { where: { cmtid: cmtid } }
        )
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to update Comment.',
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}
export default CommentService
