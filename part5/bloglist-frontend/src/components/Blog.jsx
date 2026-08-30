import {
  useParams,
  useNavigate,
} from 'react-router-dom'

const Blog = ({
  blogs,
  user,
  likeBlog,
  deleteBlog,
}) => {
  const id = useParams().id
  const navigate = useNavigate()

  const blog = blogs.find(
    blog => blog.id === id
  )

  if (!blog) {
    return null
  }

  const handleLike = () => {
    likeBlog(blog)
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete blog "${blog.title}"?`
    )

    if (!confirmed) {
      return
    }

    await deleteBlog(blog.id)

    navigate('/')
  }

  const isCreator =
    user &&
    blog.user &&
    blog.user.username === user.username
  console.log('Creator', isCreator)

  return (
    <div>
      <h2>{blog.title}</h2>

      <div>
        <a
          href={blog.url}
          target="_blank"
          rel="noreferrer"
        >
          {blog.url}
        </a>
      </div>

      <div>
        {blog.likes} likes
      </div>

      {user && (
        <button onClick={handleLike}>
          like
        </button>
      )}

      <div>
        added by {blog.author}
      </div>

      {isCreator && (
        <button onClick={handleDelete}>
          delete
        </button>
      )}
    </div>
  )
}

export default Blog