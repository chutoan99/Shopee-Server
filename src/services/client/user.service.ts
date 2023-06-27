const db = require('../../models/index')

const UserService = {
  GetAllUser: () =>
    new Promise((resolve, reject) => {
      try {
        const response = db.User.findAll({
          attributes: {
            exclude: ['password']
          }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all User.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  GetUserId: (userid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.User.findOne({
          where: {
            userid: userid
          },
          attributes: {
            exclude: ['password']
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

  UpdateUser: (userid: any, payload: any) =>
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

  DeleteUser: (userid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.User.destroy({ where: { userid: userid } })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to delete User.',
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}

export default UserService
