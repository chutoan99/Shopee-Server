const db = require('../../models/index')
const GetAllLikeService = {
  GetAllLike: (userid: string): Promise<any> =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Like.findAll({
          raw: true,
          nest: true,
          where: { userid: userid },
          include: [{ model: db.Overview, as: 'likeDetail' }],
          attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all like.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  AddLike: (payload: any): Promise<any> =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Like.findOrCreate({
          where: {
            userid: payload.userid,
            itemid: payload.itemid
          },
          defaults: {
            userid: payload.userid,
            itemid: payload.itemid,
            shopid: payload.shopid
          }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to add like.',
          response
        })
      } catch (error) {
        reject(error)
      }
    }),

  DeleteLike: (itemid: string, userid: string): Promise<any> =>
    new Promise((resolve, reject) => {
      try {
        console.log(itemid, 'itemid', userid, 'userid')
        const response = db.Like.destroy({
          where: { itemid: itemid, userid: userid }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to delete like.',
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}

export { GetAllLikeService }
