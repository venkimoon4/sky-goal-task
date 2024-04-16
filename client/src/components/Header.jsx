import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {


  const handleLogout=()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('email');
  }

  return (
    <header className='bg-orange-500 flex text-white text-xl p-3'>

      <div className='flex justify-between w-[280px] items-center'>
        <img src='./images/logo.jpg' width="100px"/>
        <p className='text-2xl w-24'>User Registation</p>
      </div>

      <div className='flex flex-1 justify-around items-center'>
        <Link to="profile">Profile</Link>
        <Link onClick={handleLogout} to='/'>Logout</Link>
      </div>
      
    </header>
  )
}

export default Header
