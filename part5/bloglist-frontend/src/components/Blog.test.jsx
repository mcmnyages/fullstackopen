import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Full Stack Open Student',
    url: 'https://fullstackopen.com/',
    likes: 5
  }
  render(<Blog blog={blog} />)
  const titleElement = screen.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(titleElement).toBeDefined()
  const authorElement = screen.getByText('Full Stack Open Student')
  expect(authorElement).toBeDefined()
  const urlElement = screen.queryByText('https://fullstackopen.com/')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText('5')
  expect(likesElement).toBeNull()
})

test('renders URL and number of likes when the view button is clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Full Stack Open Student',
    url: 'https://fullstackopen.com/',
    likes: 5
  }

  render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const urlElement = screen.getByText('https://fullstackopen.com/')
  expect(urlElement).toBeDefined()

  const likesElement = screen.findByText('5')
  expect(likesElement).toBeDefined()
})


test('if the like button is clicked twice, the event handler is called twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Full Stack Open Student',
    url: 'https://fullstackopen.com/',
    likes: 5
  }
  const mockHandler = vi.fn()

  render(<Blog blog={blog} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})