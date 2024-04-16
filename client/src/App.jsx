import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import Update from './components/Update'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}>
        <Route path='profile' element={<Profile/>}/>
        <Route path='update' element={<Update/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
