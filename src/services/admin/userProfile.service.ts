const db = require('../../models/index')

const UserProfileService = {
  GetProfile: (userid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.User.findOne({
          where: {
            userid: userid
          },
          attributes: {
            exclude: ['password', 'avatar']
          }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'User is not found.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  UpdateProfile: (userid: any, payload: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.User.update(
          {
            name: payload?.name,
            email: payload?.email,
            sex: payload?.sex,
            address: payload?.address,
            phone: payload?.phone,
            birthday: payload?.birthday
          },
          { where: { userid: userid } }
        )
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to Update User.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  GetShop: (userid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Shop.findOne({
          where: {
            userid: userid
          },
          attributes: {
            exclude: ['password']
          }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Shop is not found.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  UpdateShop: (userid: any, payload: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Shop.update(
          {
            is_official_shop: payload?.is_official_shop,
            name: payload?.name,
            cover: payload?.cover,
            status: payload?.status,
            shop_location: payload?.shop_location,
            username: payload?.username,
            portrait: payload?.portrait,
            description: payload?.description,
            country: payload?.country
          },
          { where: { userid: userid } }
        )
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to update shop.',
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}

export default UserProfileService
