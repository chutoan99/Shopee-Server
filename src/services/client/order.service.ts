const db = require('../../models/index')
import { Op } from 'sequelize'
import { generateOrderid } from '../../utils/gennerateNumber'

const OrderService = {
  GetAllOrderOfUser: async (userid: any) => {
    try {
      const response = await db.Order.findAll({
        where: {
          userid: userid
        },
        raw: true,
        nest: true,
        include: [
          { model: db.Post, as: 'orderDetail' },
          { model: db.TierVariation, as: 'tier_variations_order' }
        ],
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
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all Order of user.',
        total_order: total_order,
        response: shopIdArrays
      }
    } catch (error) {
      throw new Error('Failed to get all Order of user.')
    }
  },

  AddOrder: async (payload: any, userid: any) => {
    try {
      const length = payload.length
      const listResponse = []
      for (let index = 0; index < length; index++) {
        const response = await db.Order.create({
          orderid: +generateOrderid(),
          userid: userid,
          itemid: payload[index].itemid,
          shopid: payload[index].shopid,
          amount: payload[index].amount,
          option: payload[index].option,
          state: payload[index].state,
          type: payload[index].type,
          note: payload[index].note,
          shiped: false
        })
        listResponse.push(response)
      }
      return {
        err: listResponse ? 0 : 1,
        msg: listResponse ? 'OK' : 'Failed to add order.',
        response: listResponse ? listResponse : null
      }
    } catch (error) {
      throw new Error('Failed to add order.')
    }
  },

  UpdateOrder: async (orderid: any, payload: any, userid: any) => {
    try {
      const response = await db.Order.update(
        {
          amount: payload?.amount,
          option: payload?.option,
          state: payload?.state,
          type: payload.type
        },
        { where: { orderid: orderid, userid: userid } }
      )
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to Update order.',
        response
      }
    } catch (error) {
      throw new Error('Failed to Update order.')
    }
  },

  DeleteOrder: async (orderid: any, userid: any) => {
    try {
      const response = db.Order.destroy({
        where: { orderid: orderid, userid: userid }
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to delete order.'
      }
    } catch (error) {
      throw new Error('Failed to delete order.')
    }
  }
}

export default OrderService
