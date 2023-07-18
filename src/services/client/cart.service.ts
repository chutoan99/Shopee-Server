const db = require('../../models/index')
import { generateCartid } from '../../utils/gennerateNumber'
import { Op } from 'sequelize'

const CartService = {
  GetAllCart: async (userid: any) => {
    try {
      const response = await db.Cart.findAll({
        where: { userid: userid },
        raw: true,
        nest: true,
        include: [{ model: db.Overview, as: 'detail' }],
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
      const total_cart = listNumberCart.length
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all cart.',
        total_cart,
        response: response ? response : null
      }
    } catch (error) {
      throw new Error('Failed to get all cart.')
    }
  },

  GetCartId: async (cartid: any, userid: any) => {
    try {
      const response = await db.Cart.findOne({
        where: {
          cartid: cartid,
          userid: userid
        }
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get cart id.',
        response: response
      }
    } catch (error) {
      throw new Error('Failed to get cart id.')
    }
  },

  AddCart: async (payload: any, userid: any) => {
    try {
      let response = {}
      const condition = {
        userid: userid,
        itemid: payload.itemid
        // option: payload.option
      }
      response = await db.Cart.findOne({
        where: condition
      }).then((response: any) => {
        if (response)
          return db.Cart.update(
            {
              userid: userid,
              itemid: payload.itemid,
              shopid: payload.shopid,
              option: payload.option,
              amount: response.dataValues.amount + 1
            },
            {
              where: condition
            }
          )
        return db.Cart.create({
          cartid: generateCartid(),
          userid: userid,
          itemid: payload.itemid,
          shopid: payload.shopid,
          option: payload.option,
          amount: payload.amount
        })
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to add cart.',
        response: response ? response : null
      }
    } catch (error) {
      throw new Error('Failed to add cart.')
    }
  },

  UpdateCart: async (cartid: any, payload: any) => {
    try {
      const response = await db.Cart.update({ amount: payload?.amount, option: payload?.option }, { where: { cartid: cartid } })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to Update cart.',
        response
      }
    } catch (error) {
      throw new Error('Failed to Update cart.')
    }
  },

  DeleteCart: async (cartid: any) => {
    try {
      const response = await db.Cart.destroy({ where: { cartid: cartid } })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to delete cart.',
        response
      }
    } catch (error) {
      throw new Error('Failed to delete cart.')
    }
  }
}

export default CartService
