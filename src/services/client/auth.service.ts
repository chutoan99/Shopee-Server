const db = require('../../models/index')
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { generateUserid, generateShopid } from '../../utils/gennerateNumber'
import sendEmail from '../../middleWares/sendEmail'
import dotenv from 'dotenv'
dotenv.config()

const AuthService = {
  Register: (payload: any) =>
    new Promise((resolve, reject) => {
      try {
        const hashPassWord = (password: any) => {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
        }
        const avatar = (sex: any) =>
          sex === 0
            ? 'https://imgs.search.brave.com/NMbKJRcDath4I02VHl0t8tYf4UJSAmftuegWj3ZCbYs/rs:fit:640:403:1/g:ce/aHR0cDovL3d3dy5i/aXRyZWJlbHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEx/LzA0L0ZhY2Vib29r/LU5ldy1EZWZhdWx0/LUF2YXRhci1QaWN0/dXJlLTcuanBn'
            : 'https://imgs.search.brave.com/GgQ8DyHg0f1QxTAoZOmh4fYbylAOXHK903G1j_P_EaE/rs:fit:640:403:1/g:ce/aHR0cDovL3d3dy5i/aXRyZWJlbHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEx/LzA0L0ZhY2Vib29r/LU5ldy1EZWZhdWx0/LUF2YXRhci1QaWN0/dXJlLTQuanBn'

        const createToken = ({ userid, email, role }: { userid: any; email: any; role: any }) =>
          jwt.sign({ userid, email, role }, process.env.SECRET_KEY as string, {
            expiresIn: '1d'
          })

        let userid
        payload.userid ? (userid = payload.userid) : (userid = generateUserid())

        const response = db.User.findOrCreate({
          where: { email: payload.email },
          defaults: {
            userid,
            shopid: generateShopid(),
            password: hashPassWord(`${payload?.password}`),
            avatar: payload?.avatar,
            sex: payload.sex || 0,
            role: 'client',
            name: payload?.name,
            address: payload?.address,
            birthday: payload?.birthday,
            phone: payload?.phone
          }
        })
        const token = response[1] ? createToken({ userid, email: response.email, role: 'client' }) : null

        resolve({
          err: response[1] ? 0 : 1,
          msg: response[1] ? 'register is SuccessFully' : 'email is used',
          response: response[1] ? response : null,
          token
        })
      } catch (error) {
        reject(error)
      }
    }),

  Login: (email: any, password: any) =>
    new Promise((resolve, reject) => {
      try {
        const response = db.User.findOne({
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
        resolve({
          err: token ? 0 : 2,
          msg: token ? 'Login Success' : 'Email or Password is wrong',
          response: token ? response : null,
          access_token: token || null
        })
      } catch (error) {
        reject(error)
      }
    }),
  LoginGoogle: (token: any) =>
    new Promise((resolve, reject) => {
      try {
        jwt.verify(token, '', function (err: any, decoded: any) {
          if (err) {
            console.log('Giải mã thất bại: ', err)
          } else {
            console.log('Payload giải mã')
          }
        })
        resolve({})
      } catch (error) {
        reject(error)
      }
    }),

  LoginFacebook: (token: any) =>
    new Promise((resolve, reject) => {
      try {
        jwt.verify(token, '', function (err: any, decoded: any) {
          if (err) {
            console.log('Giải mã thất bại: ', err)
          } else {
            console.log('Payload giải mã')
          }
        })
        resolve({})
      } catch (error) {
        reject(error)
      }
    })
}
export default AuthService
