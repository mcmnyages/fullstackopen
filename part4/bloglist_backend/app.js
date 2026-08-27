const express = require('express')
const mongoose = require('mongoose')
const dns =require('dns')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controller/blog')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')

const app = express()

logger.info('connecting to', config.MONGO_URL)
dns.setServers(['1.1.1.1','8.8.8.8'])

mongoose
  .connect(config.MONGO_URL, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controller/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app