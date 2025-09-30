import {create} from 'zustand'
import {axiosInstance} from '../lib/axios'

export const useAuthStore=create((set)=>({
 authUser:null,
 isCheckingAuth:true,
 isSigningup:false,
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
    
 }

}))