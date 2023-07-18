import { Response } from 'express'
import UserService from '../../services/client/user.service'
import { badRequest, internalServerError } from '../../middleWares/handle_errors'
import Joi from 'joi'
const cloudinary = require('cloudinary').v2
import { image } from '../../helpers/validate'

const UserController = {
  GetUserId: async (req: any, res: Response) => {
    try {
      const { userid } = req.user
      const response = await UserService.GetUserId(userid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  UpdateUser: async (req: any, res: Response) => {
    try {
      const fileData = req.file
      const payload = req.body
      const { userid } = req.user
      const { error } = Joi.object({ image }).validate({
        image: fileData.path
      })
      if (error) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename)
        return badRequest(error.details[0].message, res)
      }
      UserService.UpdateUser(userid, payload, fileData).then((response: any) => {
        res.status(200).json(response)
      })
    } catch (error) {
      internalServerError(res)
    }
  }
}

export default UserController
