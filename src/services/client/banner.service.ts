const db = require('../../models/index')

const BannerService = {
  GetAllBanner: (): Promise<any> =>
    new Promise((resolve, reject) => {
      try {
        console.log('GetAllBanner')

        const response = db.Banner.findAll()
        console.log(response.toString())
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all banners.',
          total: response.length,
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}

export default BannerService
