import 'dotenv/config'
import mongoose from 'mongoose'
import dns from 'dns'
dns.setServers(['1.1.1.1', '8.8.8.8', '8.8.4.4'])

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
if (!url) {
  throw new Error('MONGODB_URI is not defined')
}

mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log('Successfully connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },

  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function(value) {
        return /^\d{2,3}-\d+$/.test(value)
      },
      message: props => `${props.value} is not a valid phone number`,
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})


const Person = mongoose.model('Person', personSchema)

export default Person