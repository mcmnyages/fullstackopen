import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

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
        {blog.title} {blog.author}
        <button onClick={() => setVisible(true)}>
          view
        </button>
      </div>
    )
  }

  return (
    <div  style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(false)}>
        hide
      </button>

      <div>{blog.url}</div>
      <div>likes {blog.likes}</div>
      <div>{blog.user?.name}</div>

      <button>like</button>
    </div>
  )
}

export default Blog