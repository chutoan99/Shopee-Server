const db = require('../../models/index')
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { generateUserid, generateShopid } from '../../utils/gennerateNumber'
import sendEmail from '../../middleWares/sendEmail'
import dotenv from 'dotenv'
dotenv.config()

const AuthService = {
  Register: async (payload: any) => {
    try {
      const hashPassWord = (password: any) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
      }
      const avatar = (sex: number) =>
        sex === 0
          ? 'https://imgs.search.brave.com/NMbKJRcDath4I02VHl0t8tYf4UJSAmftuegWj3ZCbYs/rs:fit:640:403:1/g:ce/aHR0cDovL3d3dy5i/aXRyZWJlbHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEx/LzA0L0ZhY2Vib29r/LU5ldy1EZWZhdWx0/LUF2YXRhci1QaWN0/dXJlLTcuanBn'
          : 'https://imgs.search.brave.com/GgQ8DyHg0f1QxTAoZOmh4fYbylAOXHK903G1j_P_EaE/rs:fit:640:403:1/g:ce/aHR0cDovL3d3dy5i/aXRyZWJlbHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEx/LzA0L0ZhY2Vib29r/LU5ldy1EZWZhdWx0/LUF2YXRhci1QaWN0/dXJlLTQuanBn'

      const createToken = ({ userid, email, role }: { userid: any; email: string; role: string }) =>
        jwt.sign({ userid, email, role }, process.env.SECRET_KEY as string, {
          expiresIn: '1d'
        })

      let userid
      if (payload.userid) {
        userid = payload.userid
      } else {
        userid = generateUserid()
      }

      const response = await db.User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          userid: userid,
          shopid: generateShopid(),
          password: hashPassWord(`${payload?.password}`),
          avatar: payload?.avatar || avatar(payload.sex),
          sex: payload.sex || 0,
          role: 'client',
          name: payload?.name,
          address: payload?.address,
          birthday: payload?.birthday,
          phone: payload?.phone
        }
      })
      const token = response[1] ? createToken({ userid, email: response.email, role: 'client' }) : null

      return {
        err: response[1] ? 0 : 1,
        msg: response[1] ? 'register is SuccessFully' : 'email is used',
        response: response[1] ? response : null,
        token
      }
    } catch (error) {
      throw new Error('register is Failed.')
    }
  },

  Login: async (email: any, password: any) => {
    try {
      const response = await db.User.findOne({
        where: {
          email
        },
        raw: true
      })
      const isCorrectPassWord = response && bcrypt.compareSync(password, response.password)
      const token =
        isCorrectPassWord &&
        jwt.sign(
          {
            userid: response.userid,
            email: response.email,
            role: response.role
          },
          process.env.SECRET_KEY as string,
          { expiresIn: '1d' }
        )
      return {
        err: token ? 0 : 2,
        msg: token ? 'Login Success' : 'Email or Password is wrong',
        response: token ? response : null,
        access_token: token || null
      }
    } catch (error) {
      throw new Error('Login is Failed.')
    }
  },

  LoginGoogle: (token: any) => {
    try {
      jwt.verify(token, '', function (err: any, decoded: any) {
        if (err) {
          console.log('Giải mã thất bại: ', err)
        } else {
          console.log('Payload giải mã')
        }
      })
      return {}
    } catch (error) {
      throw new Error('Login is Failed.')
    }
  },

  LoginFacebook: (token: any) => {
    try {
      jwt.verify(token, '', function (err: any, decoded: any) {
        if (err) {
          console.log('Giải mã thất bại: ', err)
        } else {
          console.log('Payload giải mã')
        }
      })
      return {}
    } catch (error) {
      throw new Error('Login is Failed.')
    }
  }
}
export default AuthService
