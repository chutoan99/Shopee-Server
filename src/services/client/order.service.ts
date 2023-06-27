const db = require('../../models/index')
import { Op } from 'sequelize'
import { generateOrderid } from '../../utils/gennerateNumber'

const OrderService = {
  GetAllOrder: (query: any) =>
    new Promise((resolve, reject) => {
      try {
        const queries = { ...query }
        console.log(queries)
        const response = db.Order.findAll({
          where: queries,
          raw: true,
          nest: true,
          include: [
            { model: db.Overview, as: 'orderDetail' },
            { model: db.User, as: 'user' }
          ],
          attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all Order.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  GetAllOrderOfUser: (userid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Order.findAll({
          where: {
            userid: userid
          },
          raw: true,
          nest: true,
          include: [{ model: db.Overview, as: 'orderDetail' }],
          attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
        })
        let shopIdArrays = response.reduce((acc: any, curr: any) => {
          const shopId = curr.shopid
          if (acc[shopId]) {
            acc[shopId].push(curr)
          } else {
            acc[shopId] = [curr]
          }
          return acc
        }, {})
        const listNumberCart = []
        shopIdArrays = Object.values(shopIdArrays)
        shopIdArrays.map((ele: any) => ele.map((item: any, index: any) => listNumberCart.push(index)))
        const total_order = listNumberCart.length
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all Order of user.',
          total_order: total_order,
          response: shopIdArrays
        })
      } catch (error) {
        reject(error)
      }
    }),

  GetOrderId: (orderid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Order.findOne({
          where: {
            orderid: orderid
          }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get Order id.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  AddOrder: (payload: any) =>
    new Promise((resolve, reject) => {
      try {
        const length = payload.length
        for (let index = 0; index < length; index++) {
          const response = db.Order.create({
            orderid: +generateOrderid(),
            userid: payload[index].userid,
            itemid: payload[index].itemid,
            shopid: payload[index].shopid,
            amount: payload[index].amount,
            option: payload[index].option,
            state: payload[index].state,
            note: payload[index].note,
            shiped: false
          })
          resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to add order.'
            // response: result,
          })
        }
      } catch (error) {
        reject(error)
      }
    }),

  UpdateOrder: (orderid: any, payload: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Order.update(
          {
            amount: payload?.amount,
            option: payload?.option,
            state: payload?.state
          },
          { where: { orderid: orderid } }
        )
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to Update order.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  DeleteOrder: (orderid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Order.destroy({
          where: { orderid: orderid }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to delete order.',
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}

export default OrderService
