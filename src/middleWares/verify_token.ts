const { notAuth } = require('./handle_errors')
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization
  console.log(token, 'token')
  if (!token) return notAuth('Require authorization', res)
  const accessToken = token.split(' ')[1]

  jwt.verify(accessToken, process.env.SECRET_KEY as jwt.Secret, (err: any, user: any) => {
    if (err) {
      const isChecked = err instanceof TokenExpiredError
      if (!isChecked) return notAuth('Access token invalid', res, isChecked)
      if (isChecked) return notAuth('Access token expired', res, isChecked)
    }

    req.user = user
    next()
  })
}
export default verifyToken
