import mongoose, { mongo } from "mongoose"
import dns from 'node:dns'




if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

// Override the default DNS resolver to avoid SRV lookup errors (ECONNREFUSED)
// when connecting to MongoDB Atlas.
dns.setServers(['1.1.1.1', '8.8.8.8'])

const password = process.argv[2]

const url = `mongodb+srv://morachasilas_db_user:${password}@fullstackopen.oyrk0gc.mongodb.net/personsApp?appName=Fullstackopen`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

person.save()
  .then(() => {
    console.log('person saved!')
    return Person.find({})
  })
  .then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
 