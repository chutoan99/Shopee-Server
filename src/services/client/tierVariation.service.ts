const db = require('../../models/index')

const TierVariationService = {
  GetAllTierVariation: async (itemid: any) => {
    try {
      const response = await db.TierVariation.findOne({
        where: { itemid: itemid }
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all TierVariation.',
        response
      }
    } catch (error) {
      throw new Error('Failed to get all TierVariation.')
    }
  }
}

export default TierVariationService
