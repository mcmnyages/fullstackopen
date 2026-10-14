import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('write blog title here')
  const authorInput = screen.getByPlaceholderText('write blog author here')
  const urlInput = screen.getByPlaceholderText('write blog url here')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'Testing forms with React Testing Library')
  await user.type(authorInput, 'Full Stack Open Student')
  await user.type(urlInput, 'https://fullstackopen.com/')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('Testing forms with React Testing Library')
  expect(createBlog.mock.calls[0][0].author).toBe('Full Stack Open Student')
  expect(createBlog.mock.calls[0][0].url).toBe('https://fullstackopen.com/')
})