import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {

  const userDetails=useSelector((store)=>{
   return store.userReducer.user
  })

  const dispatch=useDispatch();
  const navigate=useNavigate();

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

  useEffect(()=>{
    handleUserData();
  },[])

  const deleteAccount=async()=>{

    const res=await fetch('http://localhost:4000/api/user/deleteEmployee',{
      method:"DELETE",
      headers:{
        'authorization':`Bearer ${localStorage.getItem('token')}`
      }
    })

    const data=await res.json();

    if(data.error){
     return alert(data.error)
    }
    else{
      alert(data.message)
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      navigate('/')
    }


  }

  console.log(userDetails,"============")
  
  return (
    <div className='flex justify-center items-center pt-28'>
      <div className='h-[300px] flex flex-col justify-between'>
        <h1 className='text-orange-500'>User Profile :  </h1>
        <img src={`http://localhost:4000/${userDetails.profilePic}`} className='rounded-full w-[80px] h-[100px]'/>
        <p>Name : {userDetails.firstName} {userDetails.lastName}</p>
        <p>Age : {userDetails.age}</p>
        <p>Gender : {userDetails.gender}</p>
        <p>Email : {userDetails.email}</p>
        <Link to="/home/update"><button className='bg-green-700 text-white rounded w-[100%]'>Update</button></Link>
        <button onClick={deleteAccount} className='bg-red-500 text-white rounded'>Delete</button>
      </div>
    </div>
  )
}

export default Profile
