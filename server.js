const express=require('express');
const db=require('./db.js')
const app=express();
const multer=require('multer');
const cors=require('cors');
app.use(express.json())
app.use(cors())
app.use('/uploads',express.static('uploads'))
const userRouter=require('./routes/userRoutes.js');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use('/api/user',upload.single('profilePic'),userRouter)

app.listen(4000,()=>{
  console.log('Listening To Port 4000')
});