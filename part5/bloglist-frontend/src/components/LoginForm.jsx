import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async event => {
    event.preventDefault()

    const success = await login(
      username,
      password
    )

    if (success) {
      navigate('/')
    }
  }

  return (
    <div>
      <h2>login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              value={username}
              onChange={event =>
                setUsername(event.target.value)
              }
            />
          </label>
        </div>

        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={event =>
                setPassword(event.target.value)
              }
            />
          </label>
        </div>

        <button type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
