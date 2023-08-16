import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config() // Load environment variables from .env file

const connectMongodb = async () => {
  try {
    console.log(process.env.MONGODB_CONNECT, 'process.env.MONGODB_CONNECTprocess.env.MONGODB_CONNECT')
    const connectionString = process.env.MONGODB_CONNECT
    if (!connectionString) {
      throw new Error('MongoDB connection string is missing.')
    }

    const options: any = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    const yy = mongoose.connect(connectionString, options)

    console.log('Connection to Mongo database successful.')
  } catch (e: any) {
    console.error('Could not connect:', e.message)
  }
}

export default connectMongodb
