import { Request, Response } from 'express'
import joi from 'joi'
import { email, password } from '../../helpers/validate'
import { internalServerError, badRequest } from '../../middleWares/handle_errors'
import AuthService from '../../services/client/auth.service'

const AuthClientController = {
  Register: async (req: any, res: Response) => {
    try {
      const { error } = joi.object({ email, password }).validate({
        email: req.body.email,
        password: req.body.password
      })

      if (error) return badRequest(error.details[0]?.message, res)

      const payload = req.body
      const response = await AuthService.Register(payload)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  Login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(200).json({
          err: 1,
          mess: 'missing input'
        })
      }
      const response = await AuthService.Login(email, password)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  forgotPassword: async (req: any, res: Response) => {
    try {
      const code = req.code
      const { code2 } = req.body
      if (!email || !password) {
        return res.status(200).json({
          err: 1,
          mess: 'missing input'
        })
      }
      // const response = await AuthService.LoginServices(email, password);
      // return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res)
    }
  },

  loginGoogle: async (req: Request, res: Response) => {
    try {
      const { token } = req.body
      const response = await AuthService.LoginGoogle(token)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  loginFacebook: async (req: Request, res: Response) => {
    try {
      const { token } = req.body
      const response = await AuthService.LoginFacebook(token)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default AuthClientController
