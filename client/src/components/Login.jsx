import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {


  const emailRef=useRef();
  const passwordRef=useRef();
  const navigate=useNavigate();

  const handleLogin=async()=>{

    try{
      const userObj={
       email:emailRef.current.value,
       password:passwordRef.current.value,
      }

      const res=await fetch('http://localhost:4000/api/user/login',{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify(userObj)
      })

      const data=await res.json();

      localStorage.setItem('email',data.email)
      localStorage.setItem('token',data.token)
      
      if(data.error){
        alert(data.error)
      }
      else{
        navigate('/home')
      }

    }
    catch(error){
      console.log(error)
    }


  }


  return (
    <div className='flex justify-center py-32 bg-orange-600'>
      
      <form className='w-[500px] flex flex-col h-[400px] justify-between rounded-md bg-white p-9 shadow'>

       <h2 className='text-center text-[2rem] mb-2 text-orange-600'>Sign In</h2>

       <div className='flex justify-between items-center'>
        <label>Email</label>
        <input ref={emailRef} className='p-2 border-2 border-gray-700 w-[50%] rounded-md' type='email'/>
       </div>

       <div className='flex justify-between items-center'>
        <label>Password</label>
        <input ref={passwordRef} className='p-2 border-2 border-gray-700 w-[50%] rounded-md' type='password'/>
       </div>


       <button type='button' onClick={handleLogin} className='bg-orange-600 p-2 rounded-md text-white hover:bg-black'>Submit</button>

       <Link to='/signup' className='text-center hover:underline'>New User Register?</Link>

      </form>

    </div>
  )
}

export default Login
