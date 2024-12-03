import React from 'react'
import './home.scss'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
      <div className='background'> </div>
        <h1>2402 WUX <br/> Portfolio</h1>
        <div className='home-button-div'>
          <button className='home-button'><Link className='link' to='/projects'> View Projects </Link></button>
        
      </div>
    </div>
  )
}

export default Home
