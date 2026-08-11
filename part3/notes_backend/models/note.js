import mongoose from 'mongoose'
import 'dotenv/config' //I had to use this here to load the variable since in the index.js the note.js was not recieving the mongourl
import dns from 'dns' //

// Override the default DNS resolver to avoid SRV lookup errors (ECONNREFUSED)
// when connecting to MongoDB Atlas.
dns.setServers(['8.8.8.8', '8.8.4.4','1.1.1.1'])

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Note = mongoose.model('Note', noteSchema)

export default Note