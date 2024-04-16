const express=require('express');
const User=require('../models/userSchema.js');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { jwtAuthMiddleware } = require('../auth.js');
const router=express.Router();

require('dotenv/config.js')

router.post('/signup',async(req,res)=>{

  try{

  const data=req.body;
  const profilePath=req.file.path;

  const findUser=await User.findOne({email:data.email});

  if(findUser){
    return res.status(400).json({error:"user with email already exist"})
  }

  const salt=await bcrypt.genSalt();

  const hashedPassword=await bcrypt.hash(data.password,salt);

  const createNewUser=await User.create({firstName:data.firstName,lastName:data.lastName,age:data.age,gender:data.gender,email:data.email,password:hashedPassword,profilePic:profilePath})

  res.status(200).json({message:"user created sucessfully"})
}
catch(error){
  res.status(500).json({error:error.message})
}

})


router.post('/login',async(req,res)=>{
  try{
   const data=req.body;

   const findUser=await User.findOne({email:data.email});

   if(!findUser){
    return res.status(400).json({error:"User not found"})
   }

   const isPasswordMatched=await bcrypt.compare(data.password,findUser.password);

   if(!isPasswordMatched){
    return res.status(400).json({error:"incorrect password"})
   }

   const token=jwt.sign({id:findUser._id},process.env.SECRET)

   res.status(200).json({token:token,email:findUser.email,message:"success"})
  }
  catch(error){
  res.status(500).json({error:error.message})
  }
})

router.get('/userData',jwtAuthMiddleware,async(req,res)=>{

  try{

    const {id} = req.user;

    console.log(id)

    const findUser=await User.findById(id)

    if(!findUser){
      return res.status(400).json({error:"user not found"})
    }

    const userObj={
      firstName:findUser.firstName,
      lastName:findUser.lastName,
      age:findUser.age,
      gender:findUser.gender,
      email:findUser.email,
      profilePic:findUser.profilePic
    }

    res.status(200).json(userObj)

  }
  catch(error){
  res.status(500).json({error:error.message})
  }

})


router.put('/updateEmployee',jwtAuthMiddleware,async(req,res)=>{

  try{
    const {id}=req.user;
    const data=req.body;
    const profilePath=req.file.path;

    const findUser=await User.findById(id);

    if(!findUser){
      return res.status(400).json({error:"user not found"})
    }

    const salt=await bcrypt.genSalt();

    const hashedPassword=await bcrypt.hash(data.password,salt);

    const updateUser=await User.findByIdAndUpdate(id,{firstName:data.firstName,lastName:data.lastName,age:data.age,gender:data.gender,email:data.email,password:hashedPassword,profilePic:profilePath})

    const userObj={
      firstName:updateUser.firstName,
      lastName:updateUser.lastName,
      age:updateUser.age,
      gender:updateUser.gender,
      email:updateUser.email,
      profilePic:updateUser.profilePic
    }
    res.status(200).json({message:"updated successfully",user:userObj})
  }
  catch(error){
  res.status(500).json({error:error.message})
  }
})


router.delete('/deleteEmployee',jwtAuthMiddleware,async(req,res)=>{
  try{
   const {id}=req.user;

   const findUserAndDelete=await User.findByIdAndDelete(id);
   if(!findUserAndDelete){
    return res.status(400).json({error:"user not found"})
   }
   res.status(200).json({message:"account deleted sucessfully"})
  }
  catch(error){
    res.status(500).json({error:error.message})
  }
})

module.exports=router;