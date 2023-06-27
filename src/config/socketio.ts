import http from 'http'
import { Server } from 'socket.io'

const configSocketIO = (app: any) => {
  // Create an HTTP server using the Express app
  const server = http.createServer(app)

  // Create a Socket.IO server using the HTTP server
  const io = new Server(server, {
    cors: { origin: '*' }
  })

  // Event listener for new connections
  io.on('connection', (socket: any) => {
    console.log('A user connected')

    // Event listener for 'message' event
    socket.on('message', (data: any) => {
      console.log('Received message:', data)
      socket.emit('message', `You sent: ${data}`)
    })

    // Event listener for 'disconnect' event
    socket.on('disconnect', () => {
      console.log('A user disconnected')
    })
  })
}

export default configSocketIO
