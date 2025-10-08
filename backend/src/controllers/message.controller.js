import User from '../models/user.js'
import Message from '../models/message.js'
import cloudinary from '../lib/cloudinary.js'
import { getReceiverSocket,io} from '../lib/socket.js'

export const userforSidebar=async(req,res)=>{
     try{
        const loggedUserId=req.user._id
        const filteredusers=await User.find({_id:{$ne:loggedUserId}}).select('-password')
        res.status(200).json(filteredusers)
     }
     catch(error){
         console.log('Error in userforSidebar controller',error.message)
         res.status(500).json({error:'Internal Server Error'})
     }
}

export const getMessages=async(req,res)=>{
    try{
       const myId=req.user._id
       const {id:userToChatId}=req.params
       const messages= await Message.find({
        $or:[
            {senederId:myId,receiverId:userToChatId},
            {senderId:userToChatId,receiverId:myId}
        ]
       })
       res.status(200).json(messages)

    }
    catch(error){
        console.log("Error in messagesforChat controller",error.message)
        res.status(500).json({error:'Internal Server Error'})
    }
}

export const sendMessage=async(req,res)=>{
    try{
       const{text,image}=req.body
       const{id:receiverId}=req.params
       const senderId=req.user._id
       let imageUrl

       if(image){
         const uploadResponse= await cloudinary.uploader.upload(image)
         console.log(uploadResponse)
         imageUrl=uploadResponse.secure_url
       }
  
       const newMessage=new Message({
         senderId,
         receiverId,
         text,
         image:imageUrl
       })

       await newMessage.save()
       
       const receiversocketId=getReceiverSocket(receiverId)
       io.to(receiversocketId).emit('newMessage',newMessage)

       res.status(201).json(newMessage)

    }
    catch(error){
        console.log('Error in sendMessage controller',error.message)
        res.status(500).json({error:'Internal Server Error'})
    }
}