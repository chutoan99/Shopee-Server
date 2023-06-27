import express from 'express'
import http from 'http'
import cors from 'cors'
import connectDb from './config/connectDb'
import configSocketIO from './config/socketio'
// import initRoutes from './routes/index'
// Create an Express app
const app = express()
app.use(cors())
connectDb()
// initRoutes(app)
configSocketIO(app)

const server = http.createServer(app)
// Enable CORS middleware
app.use(function (req: any, res: any, next: any) {
  // Set headers to allow cross-origin requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Start the server and listen on port 3000
server.listen(8000, () => {
  console.log('Server started on port 8000')
})
