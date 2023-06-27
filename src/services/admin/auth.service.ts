const db = require('../../models/index')
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const AuthService = {
  login: (email: string, password: string) =>
    new Promise((resolve, reject) => {
      try {
        console.log(email, password, 'email', 'password')
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
              shopid: response.shopid,
              userid: response.userid,
              email: response.email,
              role: response.role
            },
            process.env.SECRET_KEY!,
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
    })
}

export default AuthService
