import './login.scss'

import { useState} from 'react'

import { useSignup } from '../../hooks/useSignup'


const Signup = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleLogin = async (e) => {
    e.preventDefault()

    await signup(username, password)
   
  }

  return (
    <div className='login-body'> 
      <div className='login-border'>
        <form 
          className='login'
          
        >
          <h2 className='login-header'>Signup</h2>

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
          onClick={handleLogin}
          className='login-button'
          disabled={isLoading}
        > Signup </button>
        </div>
        {error && <div className='error'>{error}</div>}
        </form>
        
      </div>
      
    </div>
  )
}

export default Signup
