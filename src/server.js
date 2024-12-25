import { port, server } from './application.js'
import registerSocketServer from './apps/socket/index.js'

process.on('unhandledRejection', (reason, p) => {
	console.error(`Unhandled Rejection Error:`, { p, reason })
})

process.on('uncaughtException', (error) => {
	console.error(error.message)
	console.error(error.stack)
	process.exit(1)
})

server.listen(port).on('listening', async () => {
	console.log('Node.js Server running on port:\t\t %d', port)
	registerSocketServer(port)
	if (process.send) process.send('ready')
})

function handleShutdown(signal) {
	console.log(`Received ${signal}. Shutting down gracefully...`)

	server.close(() => {
		console.log('Closed out remaining connections.')
		process.exit(0)
	})

	setTimeout(() => {
		console.error('Could not close connections in time, forcefully shutting down')
		process.exit(1)
	}, 10000)
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'))
process.on('SIGINT', () => handleShutdown('SIGINT'))
