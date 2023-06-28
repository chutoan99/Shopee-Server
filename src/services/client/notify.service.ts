const db = require('../../models/index')

// GET ALL cart
const NotificationService = {
  GetAllNotification: async () => {
    try {
      const response = await db.Notification.findAll({})
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all Notification.',
        response
      }
    } catch (error) {
      throw new Error('Failed to get all Notification.')
    }
  }
}
export default NotificationService
