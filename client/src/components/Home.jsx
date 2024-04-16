import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const user=useSelector((store)=>{
    return store.userReducer.user
  })

  useEffect(()=>{
  if(!localStorage.getItem('email')){  
   navigate('/')
  }
  handleUserData();
  },[])

  const handleUserData=async()=>{

    const res=await fetch('http://localhost:4000/api/user/userData',{
      method:"GET",
      headers:{
        'authorization':`Bearer ${localStorage.getItem('token')}`
      }
    })

    const data=await res.json();
    dispatch({type:"fetchData",data:data})
    console.log(data)
  }


  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Home
