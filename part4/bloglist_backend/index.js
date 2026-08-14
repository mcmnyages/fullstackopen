const express = require('express')
const mongoose = require('mongoose')
const dns =require('dns')

const app = express()
dns.setServers(['1.1.1.1','8.8.8.8'])

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb+srv://yourname_db_user:<your_ password_here>@fullstackopen.oyrk0gc.mongodb.net/blogApp?appName=Fullstackopen'

mongoose.connect(mongoUrl).then(()=>{
    console.log('Successfully connected to MongoDB')
}).catch(error=>{
    console.log('There was an error',error)
}
)

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})