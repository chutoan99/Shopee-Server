const db = require('../../models/index')

const TierVariationService = {
  GetAllTierVariation: (itemid: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.TierVariation.findOne({
          where: { itemid: itemid }
        })
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all TierVariation.',
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}

export default TierVariationService
