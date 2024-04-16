const mongoose=require('mongoose');
const { type } = require('os');


const userSchema=mongoose.Schema({
  firstName:{
   type:String,
   require:true
  },
  lastName:{
    type:String,
    require:true
   },
   age:{
    type:Number,
    require:true
   },
   gender:{
    type:String,
    require:true
   },
   email:{
    type:String,
    require:true
   },
   password:{
    type:String,
    require:true
   },
   profilePic:{
    type:String,
   }
})


const User=new mongoose.model('User',userSchema);

module.exports=User;