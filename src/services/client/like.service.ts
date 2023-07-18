const db = require('../../models/index')
const GetAllLikeService = {
  GetAllLike: async (userid: string) => {
    try {
      const response = await db.Like.findAll({
        raw: true,
        nest: true,
        where: { userid: userid },
        include: [{ model: db.Overview, as: 'likeDetail' }],
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all like.',
        response
      }
    } catch (error) {
      throw new Error('Failed to get all like.')
    }
  },

  AddLike: async (payload: any, userid: string) => {
    try {
      const response = await db.Like.findOrCreate({
        where: {
          userid: userid,
          itemid: payload.itemid
        },
        defaults: {
          userid: userid,
          itemid: payload.itemid,
          shopid: payload.shopid
        }
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to add like.',
        response
      }
    } catch (error) {
      throw new Error('Failed to add like.')
    }
  },

  DeleteLike: async (itemid: string, userid: string) => {
    try {
      const response = await db.Like.destroy({
        where: { itemid: itemid, userid: userid }
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to delete like.'
      }
    } catch (error) {
      throw new Error('Failed to delete like.')
    }
  }
}

export { GetAllLikeService }
