import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config' //I had to use this here to load the variable since in the index.js the note.js was not recieving the mongourl
import dns from 'dns' //
import config from './utils/config.js'
import logger from './utils/logger.js'
import notesRouter from './controllers/notes.js'

import {
  requestLogger,
  unknownEndpoint,
  errorHandler
} from './utils/middleware.js'

const app = express()

// Override the default DNS resolver to avoid SRV lookup errors (ECONNREFUSED)
// when connecting to MongoDB Atlas.
dns.setServers(['8.8.8.8', '8.8.4.4','1.1.1.1'])
logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/notes', notesRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app