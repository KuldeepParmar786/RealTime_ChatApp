import {create} from 'zustand'
import {axiosInstance} from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore=create((set)=>({
 authUser:null,
 isCheckingAuth:true,
 isSigningUp:false,
 isLoggingin:false,
 isUpdatingprofile:false,
 
  checkAuth:async()=>{
    try{
       const res=await axiosInstance.get('auth/checkAuth')
       set({authUser:res.data})
    }
    catch(error){
       console.log('Error in checkAuth',error )
       set({authUser:null})
    }
    finally{
        set({isCheckingAuth:false})
    }
 },

 signUp:async({fullName,email,password})=>{
    try{
       set({isSigningUp:true})
       const res=await axiosInstance.post('/auth/signup',{fullName,email,password})
       set({autUser:res.data})
       toast.success('Account created Successfully')
    }
    catch(error){
      toast.error(error.response.data.message)
    }
    finally{
      set({isSigningUp:false})
    }
 }

}))