const db = require('../../models/index')

// GET ALL cart
const NotificationService = {
  GetAllNotification: () =>
    new Promise((resolve, reject) => {
      try {
        const response = db.Notification.findAll({})
        resolve({
          err: response ? 0 : 1,
          msg: response ? 'OK' : 'Failed to get all Notification.',
          response
        })
      } catch (error) {
        reject(error)
      }
    })
}
export default NotificationService
