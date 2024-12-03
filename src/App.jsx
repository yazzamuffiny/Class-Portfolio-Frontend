import './app.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
// NAV COMPONENTS
import Header from './components/nav/header/Header'
import Login from './pages/login-signup/Login'
import Signup from './pages/login-signup/Signup'
import Home from './pages/home/Home'
import Projects from './pages/projects/Projects'
import Footer from './components/nav/footer/Footer'
import SingleStudentProject from './pages/singleproject/SingleStudentProject'


const App = () => {
  const {user} = useAuthContext();

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>}/>
        <Route path='/signup' element={!user ? <Signup/> : <Navigate to="/"/>}/>
        <Route path='/:id' element={<SingleStudentProject/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App