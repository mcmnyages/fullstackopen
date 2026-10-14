const mongoose = require('mongoose')
const dns = require('dns')

const connectToDatabase = async (uri) => {
  console.log('connecting to database URI:', uri)

  try {
    dns.setServers(['8.8.8.8','1.1.1.1'])
    await mongoose.connect(uri)
    console.log('connected to MongoDB')
  } catch (error) {
    console.log('error connection to MongoDB:', error.message)
    process.exit(1)
  }
}

module.exports = connectToDatabase