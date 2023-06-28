const db = require('../../models/index')

const BannerService = {
  GetAllBanner: async () => {
    try {
      const response = await db.Banner.findAll()
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all banners.',
        total: response.length,
        response
      }
    } catch (error) {
      throw new Error('Failed to get all banners.')
    }
  }
}
export default BannerService
