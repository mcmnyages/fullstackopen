const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})

blogRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })

    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(400).json({
      error: error.message
    })
  }
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