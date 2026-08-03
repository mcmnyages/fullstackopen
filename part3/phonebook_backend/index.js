import express, { json, response } from 'express'
import morgan from 'morgan'

const app = express()

app.use(json())
let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]


morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)


app.get('/', (request, response) => {
  response.send('<h1>It is working finally</h1>')
})

app.get('/api/info', (request, response) => {

  response.send(`<p>Phonebook has infor for ${persons.length} people</p>
    <p>${new Date()}</p>
    `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (id) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Missing name or number!"
    })
  }

  const nameExist = persons.find((person)=>{
    return person.name===body.name
  })
  

  if(nameExist){
    return response.status(400).json({
      error:"Name must be unique!"
    })
  }

  const person = {
    id: Math.floor(Math.random() * 10000000),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person);

  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.filter(person => person.id !== id)
  if (id) {
    response.status(204).end()
  } else {
    response.status(404)
  }

})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server UP and listening to port ${PORT}`)
})