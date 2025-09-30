import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import cloudinary from 'cloudinary'

export const protectRoute=async(req,res,next)=>{
 try{
    const token=req.cookies.jwt
    if(!token){
       return res.status(401).json({error:'Unauthorized:No Token Provided'})
    }
   
    const decoded=jwt.verify(token,process.env.SECRET)
    console.log(decoded)
    if(!decoded){
        return res.status(401).json({error:'Unauthorized:Invalid token'})
    }
    const user=await User.findById(decoded.userId).select("-password")

    if(!user){
        return res.status(401).send({error:'User not found'})
    }

    req.user=user

    next()

 }catch(error){
   console.log('Error in protectRoute middleware',error.message)
   res.status(500).send({error:'Internal Server Error'})
 }
}