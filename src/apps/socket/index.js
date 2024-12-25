/* ------------------------------ Node Modules ------------------------------ */
import util from 'node:util'
/* ----------------------------- Custom Modules ----------------------------- */
import { io } from '../../application.js'
import { disconnectListener } from './events/listener/index.js'
/* -------------------------------------------------------------------------- */

const listener = [{ event: 'disconnect', handler: disconnectListener }]

/**
 * Token payload is accessible in `socket.data.payload`
 * Query Parameters are accessible in `socket.handshake.query`
 */
const registerSocketServer = (port) => {
	io.sockets.on('connect', async (socket) => {
		console.log(`socket id: ${socket.id} connected.`)

		const channel_name = `user_id_${socket.data.payload.user_id}`
		socket.join(channel_name)
		console.log(util.inspect({ socket_id: socket.id, joined_channel: channel_name }, false, null, true))

		for (const { event, handler } of listener) socket.on(event, (data) => handler(socket, data))
	})

	console.log('Socket.io Server running on port:\t %d', port)
}

export default registerSocketServer
