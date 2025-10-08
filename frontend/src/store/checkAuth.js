import {create} from 'zustand'
import {axiosInstance} from '../lib/axios'
import toast from 'react-hot-toast'
import {io} from 'socket.io-client'

const BaseURL='http://localhost:4000'
export const useAuthStore=create((set,get)=>({
 authUser:null,
 isCheckingAuth:true,
 isSigningUp:false,
 isLoggingin:false,
 isUpdatingprofile:false,
 onlineUsers:[],
 socket:null,
 
  checkAuth:async()=>{
    try{
       const res=await axiosInstance.get('auth/checkAuth')
       set({authUser:res.data})
       get().connectSocket()
    }
    catch(error){
       console.log('Error in checkAuth',error )
       set({authUser:null})
    }
    finally{
        set({isCheckingAuth:false})
    }
 },

 signUp:async(data)=>{
    try{
       set({isSigningUp:true})
       const res=await axiosInstance.post('/auth/signup',data)
       set({autUser:res.data})
       toast.success('Account created Successfully')
       get().connectSocket()
    }
    catch(error){
      toast.error(error.response.data.error)
    }
    finally{
      set({isSigningUp:false})
    }
 },

 logout:async()=>{
   try{
    await axiosInstance.post('/auth/logout')
    set({authUser:null})
    toast.success('Logged out successfully')
    get().disconnectSocket()
   }
   catch(error){
      toast.error(error.response.data.error)
   }
 },

 login:async(data)=>{
    try{
      set({isLoggingin:true})
      const res=await axiosInstance.post('auth/login',data)
      set({authUser:res.data})

      toast.success('Logged in successfully')
      get().connectSocket()
    }
    catch(error){
      toast.error(error.response.data.error)
    }
    finally{
       set({isLoggingin:false})
    }
 },

 updateProfile:async(data)=>{
   try{
      set({isUpdatingprofile:true})
      const res=await axiosInstance.put('/auth/updateProfile',data)
      set({authUser:res.data})
      toast.success('Profile updated successfully')
   }
   catch(error){
      toast.error(error.response.data.error)
   }
   finally{
      set({isUpdatingprofile:false})
   }
 },
 
 connectSocket:()=>{
    const {authUser}=get()
    if(!authUser || get().socket?.connected) return
    const socket=io(BaseURL,{
      query:{
         userId:authUser._id
      }
    })
    socket.connect
    set({socket:socket})

   socket.on('getOnlineUsers',(users)=>{
      set({onlineUsers:users})
      console.log(get().onlineUsers)
   })
 },
 disconnectSocket:()=>{
    if(get().socket?.connected) get().socket.disconnect()
 }

}))