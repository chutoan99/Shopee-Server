const db = require('../../models/index')
import { generateCartid } from '../../utils/gennerateNumber'
import { Op } from 'sequelize'

const CartService = {
  GetAllCart: (userid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Cart.findAll({
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
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all cart.',
          total_cart,
          response: shopIdArrays
        })
      } catch (error) {
        reject(error)
      }
    }),

  GetCartId: (itemid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Cart.findOne({
          where: {
            itemid: itemid
          }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get cart id.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  AddCart: (payload: any) =>
    new Promise((resolve, reject) => {
      try {
        let response = {}
        const condition = {
          userid: payload.userid,
          itemid: payload.itemid
          // option: payload.option,
        }

        response = db.Cart.findOne({
          where: condition
        }).then((response: any) => {
          console.log(response, 'res')
          if (response)
            return db.Cart.update(
              {
                userid: payload.userid,
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
            userid: payload.userid,
            itemid: payload.itemid,
            shopid: payload.shopid,
            option: payload.option,
            amount: payload.amount
          })
        })
        console.log(response)
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to add cart.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  UpdateCart: (itemid: any, payload: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Cart.update(
          { amount: payload?.amount, option: payload?.option },
          { where: { itemid: itemid } }
        )

        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to Update cart.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  DeleteCart: (itemid: any, userid: any, payload: any) =>
    new Promise((resolve, reject) => {
      try {
        console.log(payload)
        const response = db.Cart.destroy({
          where: { cartid: { [Op.in]: payload } }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to delete cart.',
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}

export default CartService
