import {create} from 'zustand'
import {axiosInstance} from '../lib/axios'
import {toast} from 'react-hot-toast'

export const useChatStore=create((set,get)=>({
    isLoadingusers:true,
    isLoadingmessages:false,
    SelectedUser:null,
    users:[],
    messages:[],


    getUsers:async()=>{
        set({isLoadingusers:true})
        try{
           const res=await axiosInstance.get('/message/users')
           set({users:res.data})
        }
        catch(error){
            toast.error(error.response.data.error)
        }
        finally{
            set({isLoadingusers:false})
        }
    },

    getMessages:async(userId)=>{
        set({isLoadingmessages:true})
       try{ 
            const res=await axiosInstance.get(`/message/${userId}`)
            set({messages:res.data})
       }
       catch(error){
         toast.error(error.response.data.error)
       }
       finally{
          set({isLoadingmessages:false})
       }

    },

    sendMessage:async(Messagedata)=>{
        try{
        const{messages,SelectedUser}=get()
        const res=await axiosInstance.post(`/message/send/${SelectedUser._id}`,Messagedata)
        set({messages:[...messages,res.data]})
        }
        catch(error){
            toast.error(error.response.data.error)
        }

    },

    setSelectedUser:(SelectedUser)=>{
       set({SelectedUser})
    }

}))