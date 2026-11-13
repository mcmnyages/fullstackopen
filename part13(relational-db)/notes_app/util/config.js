require('dotenv').config()

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET:process.env.SECRET || 'add your own secret to .env to avoud using this',
  PORT: process.env.PORT || 3001,
}