import './login.scss'

import { useState} from 'react'

import { useLogin } from '../../hooks/useLogin'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleLogin = async (e) => {
    e.preventDefault()

    await login(username, password)
  }

  return (
    <div className='login-body'> 
      <div className='login-border'>
        <form 
          className='login'
        >
          <h2 className='login-header'>Login</h2>

          <label htmlFor="username"> Username: </label>
          <input
            type="text" 
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <label htmlFor="password"> Password: </label>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

        <div className='button-div'>
        <button
          className='login-button'
          disabled={isLoading}
          onClick={handleLogin}
        > Login </button>
        </div>
        {error && <div className='error'>{error}</div>}
        </form>
        
      </div>
      
    </div>
  )
}

export default Login
