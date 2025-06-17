import { Server as NetServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { NextApiResponse } from 'next'

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: NetServer & {
      io?: SocketIOServer
    }
  }
}

export const initSocket = (res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
    })
    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('Client connected')

      socket.on('join-game', ({ playerAddress, opponentAddress }) => {
        const roomId = [playerAddress, opponentAddress].sort().join('-')
        socket.join(roomId)
        console.log(`Player ${playerAddress} joined room ${roomId}`)
      })

      socket.on('make-move', ({ roomId, position, playerAddress }) => {
        io.to(roomId).emit('move-made', { position, playerAddress })
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })
  }
  return res.socket.server.io
} 