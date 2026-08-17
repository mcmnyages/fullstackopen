const { after, beforeEach, test, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property id named id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
        assert.ok(blog.id)
        assert.strictEqual(blog.__id, undefined)
    })
})

test('a valid blog post can be added', async () => {
    const newBlog = {
        title: 'New Blog',
        author: 'New Author',
        url: 'https://example.com/new-blog',
        likes: 7
    }
    const blogsAtStart = await api.get('/api/blogs')
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await api.get('/api/blogs')

    assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length + 1)
})

test('likes defaults to 0 if missing', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'John Doe',
    url: 'https://example.com/no-likes'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'John Doe',
    url: 'https://example.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'A blog without URL',
    author: 'John Doe'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

  const titles = blogsAtEnd.map(r => r.title)
  assert.strictEqual(titles.includes(blogToDelete.title), false)
})

test('a blog likes can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedData = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 10
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)
    
  assert.strictEqual(response.body.likes, blogToUpdate.likes + 10)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlogInDb = blogsAtEnd.find(b => b.id === blogToUpdate.id)
  assert.strictEqual(updatedBlogInDb.likes, blogToUpdate.likes + 10)
})

after(async () => {
    await mongoose.connection.close()
})