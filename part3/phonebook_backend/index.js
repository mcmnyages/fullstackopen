import express, { json, response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'
import cors from "cors"
import Person from './models/person.js'
import { compose } from 'node:stream'


const app = express()
app.use(express.json())
app.use(express.static('dist'))
// app.use(cors())
// app.use(cors()) since I build frontend in this backend folder there is no need for cors
//I have used reversed proxy in the fronted 
//And since I am going to push the dist folder and backend it means I also have the UI. Allow cors when not using this type of method though.



morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}


app.get('/api/info', (request, response) => {

  response.send(`<p>Phonebook has infor for ${persons.length} people</p>
    <p>${new Date()}</p>
    `)
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(person=>{
     response.json(person)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then( person=>{
    response.json(person)
  }
  )
})



app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Missing name or number!'
    })
  }

  Person.findOne({ name: body.name })
    .then(existingPerson => {
      if (existingPerson) {
        return response.status(400).json({
          error: 'Name must be unique!'
        })
      }

      const person = new Person({
        name: body.name,
        number: body.number
      })

      return person.save()
    })
    .then(savedPerson => {
      response.status(201).json(savedPerson)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({
        error: 'Something went wrong'
      })
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findOneAndDelete(request.params.id)
    .then(deletedPerson => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.use(errorHandler)

const PORT = process.env.PORT 
console.log('Port', PORT)

app.listen(PORT, () => {
  console.log(`Server UP and listening to port ${PORT}`)
})