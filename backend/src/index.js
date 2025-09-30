import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js'
import {dbConnect} from './lib/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app=express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter);
app.use('/api/message',messageRouter)


const PORT=process.env.PORT;
const URL=process.env.MONGODB_URI;

app.listen(PORT,()=>{
    console.log("Server running on port",PORT);
    dbConnect(URL)
})
