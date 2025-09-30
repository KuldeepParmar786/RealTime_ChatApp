import mongoose from 'mongoose';

export const dbConnect=async(URL)=>{
     try{
        await mongoose.connect(URL)
        console.log('Connected Succesfully');
    }

    catch(error){
       console.log("Error Connecting to Database",error);
    }
}