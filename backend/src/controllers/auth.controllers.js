import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import {generateToken} from '../lib/utils.js'
import cloudinary from '../lib/cloudinary.js'

export const login=async(req,res)=>{
    const{email,password}=req.body
    try{
       if(!email||!password)return  res.status(400).json({error:'Both fields are necessary'})
       
       const user=await User.findOne({email})

       if(!user) return res.status(400).json({error:'No user is registered with this email, signup to continue'})

      const decoded=await bcrypt.compare(password,user.password)

      if(!decoded) return res.status(400).json({error:'The password you entered is incorrect'})
      
      generateToken(user._id,res)

      res.status(200).json({
         _id:user._id,
         user:user.fullName,
         email:user.email,
         profilePic:user.profilePic
      })
      
    }
    catch(error){
       console.log('Error in login controller',error.message)
       res.status(500).json({error:'Internal Server Error'})
    }
};

export const signup=async(req,res)=>{
 const{fullName,email,password}=req.body
 try{
    if(!fullName||!email||!password){
      return res.status(400).json({error:'All fields are required'})
    }
    if(password.length<6){
       return res.status(400).json({error:'Password must be at least 6 characters'})
    }
    const user=await User.findOne({email})
    console.log(email)
    if(user){
       return res.status(400).json({error:"Email already exists"})
    }

    const saltrounds=10
    const passwordHash=await bcrypt.hash(password,saltrounds)
    const newUser=new User({
        fullName:fullName,
        email:email,
        password:passwordHash,
    })

   if(newUser){
      generateToken(newUser._id,res)
      await newUser.save()
      return res.status(201).json({
         _id:newUser._id,
         fullName:newUser.fullName,
         email:newUser.email,
         profilePic:newUser.profilePic
      })
   }
   else{
     res.status(400).json({error:"Invalid user data"})
   }
 }

 catch(error){
    console.log('Error in signup controller',error.message)
    res.status(500).json({error:'Internal Server Error'})
 }
};

export const logout=(req,res)=>{
   try{
       res.cookie('jwt',"",{maxAge:0})
       res.status(201).json({message:'Logged out successfully'})
   }
   catch(error){
      console.log('Error in logout controller',error.message)
      res.status(500).json({error:'Internal Server Error'})
   }
};

export const updateProfile=async(req,res)=>{
   const{profilePic}=req.body
   try{
     if(!profilePic) return res.status(400).json({error:'ProfilePic is required'})

     const userId=req.user._id
     
     const uploadResult= await cloudinary.uploader.upload(profilePic)

     const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResult.secure_url},{new:true})

     res.status(200).json(updatedUser)
     
     
    
   }
   catch(error){
      console.log('Error in updateProfile controller',error.message)
      res.status(500).json({error:'Internal Server Error'})
   }
}

export const checkAuth=async(req,res)=>{
   try{
      res.status(200).json(req.user)
   }
   catch(error){
      console.log('Error in checkAuth controller ',error.message)
      res.status(500).json({error:'Internal Server Error'})
   }
}