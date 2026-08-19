const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// POST new blog
blogRouter.post('/', async (request, response) => {
  const body = request.body

  // Temporary: pick the first user from the database as the creator
  const users = await User.find({})
  const user = users[0]

  if (!user) {
    return response.status(400).json({ error: 'no users found in database, create a user first' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  
  // Save the blog reference to the user's blogs array
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { returnDocument: 'after', runValidators: true, context: 'query' }
  )
  response.json(updatedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const deletedItem = await Blog.findByIdAndDelete(id)
  response.status(204).end()

})

module.exports = blogRouter