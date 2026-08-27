import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [formVisible, setFormVisible] = useState(false)
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })
  const hideWhenVisible = {
    display: formVisible ? 'none' : ''
  }
  const showWhenVisible = {
    display: formVisible ? '' : 'none'
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(user)
      )
      setNotification({
        message: `Welcome ${user.name}`,
        type: 'success'
      })
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
      setNotification({
        message: 'Wrong username or password',
        type: 'error'
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setNotification({
      message: `${user.name} Logged out successfully`,
      type: 'success'
    })
    setUser(null)
  }

  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const createBlog = async blogObject => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setNotification({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        type: 'success'
      })
      setFormVisible(false)
    } catch {
      setNotification({
        message: 'adding the blog failed',
        type: 'error'
      })
    }
  }

  const updateBlog = async blog => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    await blogService.updateBlog(blog.id, updatedBlog)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
  }

  const deleteBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog.id)

      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    if (notification.message === null) {
      return
    }
    const timeoutId = setTimeout(() => {
      setNotification({
        message: null,
        type: null
      })
    }, 5000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [notification])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          message={notification.message}
          type={notification.type}
        />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notification.message}
        type={notification.type}
      />
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <h2>create new</h2>
      <div style={hideWhenVisible}>
        <button onClick={() => setFormVisible(true)}>
          create new blog
        </button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm createBlog={createBlog} />
        <button onClick={() => setFormVisible(false)}>
          cancel
        </button>
      </div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        )
      }
    </div>
  )
}

export default App