const jwt=require('jsonwebtoken');
require('dotenv/config.js')


const jwtAuthMiddleware=async(req,res,next)=>{

  try{

    const token=req.headers.authorization.split(" ")[1];

    if(!token){
      return res.status(400).json({error:"token not found"})
    }

    const decoded=await jwt.verify(token,process.env.SECRET)

    req.user=decoded;
    next();

  }
  catch(error){
   res.status(500).json({message:error.message})
  }

}


const generateToken=(userPayload)=>{
  return jwt.sign(userPayload,process.env.SECRET)
}

module.exports={jwtAuthMiddleware,generateToken}