const mongoose=require('mongoose');

const mongoDBURL='mongodb://127.0.0.1:27017/userregistraion?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.3'

mongoose.connect(mongoDBURL);

const db=mongoose.connection;

db.on('connected',()=>{
  console.log('Connected To MongoDB Server')
})

db.on('disconnected',()=>{
  console.log('Disconnected to MongoDB Server')
})

db.on('error',()=>{
  console.log('Error in connecting MongoDB Server')
})

module.exports=db;