const db = require('../../models/index')

const UserService = {
  GetAllUser: async () => {
    try {
      const response = await db.User.findAll({
        attributes: {
          exclude: ['password']
        }
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all User.',
        response
      }
    } catch (error) {
      throw new Error('Failed to get all User.')
    }
  },

  GetUserId: async (userid: any) => {
    try {
      const response = await db.User.findOne({
        where: { userid: userid },
        attributes: { exclude: ['password'] }
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'User is not found.',
        response
      }
    } catch (error) {
      throw new Error('Failed to get all User. ID')
    }
  },

  UpdateUser: async (userid: any, payload: any) => {
    try {
      const response = await db.User.update(
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
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to  User.',
        response
      }
    } catch (error) {
      throw new Error('Failed to Update User')
    }
  },

  DeleteUser: async (userid: any) => {
    try {
      const response = await db.User.destroy({ where: { userid: userid } })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to delete User.',
        response
      }
    } catch (error) {
      throw new Error('Failed to delete User')
    }
  }
}

export default UserService
