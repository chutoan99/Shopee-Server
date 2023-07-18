import { Request, Response } from 'express'
import UserService from '../../services/client/user.service'
import { internalServerError } from '../../middleWares/handle_errors'

const UserController = {
  // GetAllUser: async (req: Request, res: Response) => {
  //   try {
  //     const response = await UserService.GetAllUser()
  //     return res.status(200).json(response)
  //   } catch (error) {
  //     internalServerError(res)
  //   }
  // },

  GetUserId: async (req: any, res: Response) => {
    const { userid } = req.user
    try {
      const response = await UserService.GetUserId(userid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  UpdateUser: async (req: any, res: Response) => {
    const payload = req.body
    const { userid } = req.user
    try {
      const response = await UserService.UpdateUser(userid, payload)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  DeleteUser: async (req: any, res: Response) => {
    const { userid } = req.user
    try {
      const response = await UserService.DeleteUser(userid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  }
}

export default UserController
