import express from 'express'
import http from 'http'
import cors from 'cors'
import configSocketIO from './config/socketio'
import initRoutes from './routes/index'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import connectMySql from './config/mysql'
import connectMongodb from './config/mongodb'
// Create an Express app
const app = express()
app.use(cors())
app.use(express())
app.use(cookieParser())
app.options('*', cors())
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  })
)

// app
connectMySql()
connectMongodb()
initRoutes(app)
// configSocketIO(app)
// Set up Socket.IO

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
const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// Create a Socket.IO server using the HTTP server
const io = new Server(server, {
  cors: { origin: '*' }
})

// Event listener for new connections
io.on('connection', (socket) => {
  console.log('A user connected')

  // Event listener for 'message' event
  socket.on('message', (data) => {
    console.log('Received message:', data)
    socket.emit('message', `You sent: ${data} `)
  })

  // Event listener for 'disconnect' event
  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})
