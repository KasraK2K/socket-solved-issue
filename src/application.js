import http from 'node:http'
import express from 'express'
import { Server } from 'socket.io'
import methodOverride from 'method-override'
import compression from 'compression'

const app = express()
app.disable('x-powered-by')

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

const instanceIndex = parseInt(process.env.NODE_APP_INSTANCE, 10) || 0
const basePort = 3000
const port = basePort + instanceIndex

app.use(methodOverride())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compression())

export { app, io, port, server }
