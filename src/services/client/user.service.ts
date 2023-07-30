const db = require('../../models/index')
const cloudinary = require('cloudinary').v2

const UserService = {
  GetUserId: async (userid: any) => {
    try {
      const response = await db.User.findOne({
        where: { userid: userid },
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt', 'password']
        }
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

  UpdateUser: async (userid: any, payload: any, fileData: any) => {
    try {
      if (fileData) {
        payload.avatar = fileData.path
      }
      const response = await db.User.update(
        {
          sex: +payload?.sex,
          email: payload?.email,
          name: payload?.name,
          address: payload?.address,
          phone: +payload?.phone,
          birthday: +payload?.birthday,
          avatar: payload.avatar
        },
        { where: { userid: userid } }
      )
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to  User.'
      }
      if (fileData && !response) cloudinary.uploader.destroy(fileData.filename)
    } catch (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename)
      throw new Error('Failed to Update User')
    }
  }
}

export default UserService
