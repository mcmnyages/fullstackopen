import mongoose from "mongoose"
import dns from 'node:dns'

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

// Override the default DNS resolver to avoid SRV lookup errors (ECONNREFUSED)
// when connecting to MongoDB Atlas.
dns.setServers(['1.1.1.1', '8.8.8.8'])

const password = process.argv[2]

const url = `mongodb+srv://morachasilas_db_user:${password}@fullstackopen.oyrk0gc.mongodb.net/noteApp?appName=Fullstackopen`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
// Uncoment this if you want to create a note
// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })


Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})