import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const isOwner= blog.user && blog.user.username === user.username
  console.log('Owner of the blog',isOwner)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!visible) {
    return (
      <div style={blogStyle}>
        <span>{blog.title}</span> {blog.author}
        <button onClick={() => setVisible(true)}>
          view
        </button>
        {blog.user && blog.user.username === user.username && (
          <button onClick={() => deleteBlog(blog)} style={{ backgroundColor: 'red' }}>
            Delete
          </button>
        )}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(false)}>
        hide
      </button>
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes}
        <button onClick={() => updateBlog(blog)}>
          like
        </button>
      </div>
      <div>
        added by {blog.user?.name}
      </div>
      {blog.user && blog.user.username === user.username && (
        <button onClick={() => deleteBlog(blog)} style={{ backgroundColor: 'red' }}>
          Delete
        </button>
      )}
    </div>
  )
}

export default Blog