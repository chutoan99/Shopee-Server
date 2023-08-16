import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST!,
  dialect: 'mysql',
  port: parseInt(process.env.DB_PORT!),
  logging: true,
  pool: {
    max: 30,
    min: 0,
    acquire: 600000,
    idle: 5000
  }
})

const connectMySql = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection to MySQL database successful.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export default connectMySql
