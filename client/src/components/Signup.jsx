import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate=useNavigate();

  const [profile,setProfile]=useState('./images/no-image.jpg')

  const firstNameRef=useRef();
  const lastNameRef=useRef();
  const ageRef=useRef();
  const genderRef=useRef();
  const emailRef=useRef();
  const passwordRef=useRef();
  const profilePicRef=useRef();

  const handleSignup=async()=>{

    try{

    const formData=new FormData();

    formData.append('firstName',firstNameRef.current.value)
    formData.append('lastName',lastNameRef.current.value)
    formData.append('age',Number(ageRef.current.value))
    formData.append('gender',genderRef.current.value)
    formData.append('email',emailRef.current.value)
    formData.append('password',passwordRef.current.value)
    formData.append('profilePic',profilePicRef.current.files[0])

    const res=await fetch('http://localhost:4000/api/user/signup',{
      method:"POST",
      body:formData
    })

    const data=await res.json();

    alert(data.message)
    navigate('/')

  }
  catch(error){
    alert(error)
  }

  }


  return (

    <div className='flex justify-center py-32 bg-orange-600'>
      
      <form className='w-[500px] flex flex-col h-[600px] justify-between rounded-md bg-white p-9 shadow'>

        <h2 className='text-center text-[2rem] mb-2 text-orange-600'>Sign Up</h2>

       <div className='flex justify-between items-center'>
        <label>First Name</label>
        <input ref={firstNameRef} className='p-2 border-2 border-gray-700 w-[50%] rounded-md' />
       </div>

       <div className='flex justify-between items-center'>
        <label>Last Name</label>
        <input ref={lastNameRef} className='p-2 border-2 border-gray-700 w-[50%] rounded-md' />
       </div>

       <div className='flex justify-between items-center'>
        <label>Age</label>
        <input ref={ageRef} className='p-2 border-2 border-gray-700 w-[50%] rounded-md' type='number' />
       </div>

       <div className='flex justify-between items-center'>
        <label>Gender</label>
        <select ref={genderRef} className='p-2 border-2 border-gray-700 w-[50%] rounded-md'>
          <option>Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
       </div>

       <div className='flex justify-between items-center'>
        <label>Email</label>
        <input ref={emailRef} className='p-2 border-2 border-gray-700 w-[50%] rounded-md' type='email'/>
       </div>

       <div className='flex justify-between items-center'>
        <label>Password</label>
        <input ref={passwordRef} className='p-2 border-2 border-gray-700 w-[50%] rounded-md' type='password'/>
       </div>

       <div className=''>
        <div className='flex justify-between border-2 border-gray-700 items-center p-3 rounded-md'>
        <input ref={profilePicRef} className='text-orange-600' onChange={(e)=>{
          const path=e.target.files[0];
          const profilePicPath=URL.createObjectURL(path);
          setProfile(profilePicPath)
        }} type='file'/>
        <img src={profile} width="65px" className='rounded-full object-cover' height="65px"/>
        </div>
       </div>

       <button type='button' onClick={handleSignup} className='bg-orange-600 p-2 rounded-md text-white hover:bg-black'>Submit</button>

       <Link to="/" className='text-center'>Already Registered ? <span className='text-orange-600'>Login?</span></Link>

      </form>

    </div>

  )
}

export default Signup
