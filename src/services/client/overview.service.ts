import { Op } from 'sequelize'
const db = require('../../models/index')
const cloudinary = require('cloudinary').v2
import dotenv from 'dotenv'
dotenv.config()

const OverviewService = {
  GetAllOverview: ({
    page,
    limit,
    order,
    name,
    price,
    ...query
  }: {
    page?: number
    limit?: number
    order?: string
    name?: string
    price?: number[]
    [key: string]: any
  }) =>
    new Promise((resolve, reject) => {
      try {
        const queries: any = { raw: true, nest: true } // Use 'any' type for 'queries' object
        const offset = !page || +page <= 1 ? 0 : +page - 1
        const fLimit = +limit! || +process.env.LIMIT!
        queries.offset = offset * fLimit
        queries.limit = fLimit
        if (order) queries.order = [order]
        if (name) query.name = { [Op.substring]: name }
        if (price) query.price = { [Op.between]: price }

        const response = db.Overview.findAndCountAll({
          where: query,
          ...queries
        })

        const total = Math.ceil(response.count / fLimit)
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'cannot be found',
          page: page ? +page : 0,
          limit: +limit! ? +limit! : +process.env.LIMIT!,
          totalPage: total,
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  // GetAllid: () =>
  //   // page, limit, order
  //   //name la filter
  //   new Promise((resolve, reject) => {
  //     try {
  //       var limit = []
  //       const response = db.Overview.findAll({
  //         attributes: ['itemid', 'shopid']
  //       })
  //       // response.map((item) => limit.push(item.itemid));
  //       resolve(response)
  //     } catch (error) {
  //       reject(error)
  //     }
  //   }),

  GetOverviewId: (itemid: string) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Overview.findOne({
          where: { itemid: itemid }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get Overview id.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  AddOverview: (payload: any, fileData: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Overview.create({
          itemid: payload?.itemid,
          shopid: payload?.shopid,
          name: payload?.name,
          image: fileData?.path,
          stock: payload?.stock,
          filename: fileData?.filename,
          historical_sold: payload?.historical_sold,
          price: payload?.price,
          price_min: payload?.price_min,
          price_max: payload?.price_max,
          price_min_before_discount: payload?.price_min_before_discount,
          price_max_before_discount: payload?.price_max_before_discount,
          discount: payload?.discount === '' ? null : payload.discount,
          shop_rating: payload?.shop_rating
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to add Overview id.',
          response
        })
        if (fileData && !response) cloudinary.uploader.destroy(fileData.filename)
      } catch (error) {
        reject(error)
        if (fileData) cloudinary.uploader.destroy(fileData.filename)
      }
    }),

  UpdateOverview: (itemid: any, payload: any, fileData: any) =>
    new Promise((resolve, reject) => {
      try {
        if (fileData) {
          payload.image = fileData.path
        }
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
          msg: response ? 'update Overview success' : 'Failed to update Overview id.',
          response
        })
        if (fileData && !response) cloudinary.uploader.destroy(fileData.filename)
      } catch (error) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename)
        reject(error)
      }
    }),

  DeleteOverview: (itemid: string, fileName: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Overview.destroy({
          where: { itemid: itemid }
        })
        cloudinary.api.delete_resources(fileName)
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to Delete Overview id.',
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}

export default OverviewService
