import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js'
import {dbConnect} from './lib/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import{app,server} from './lib/socket.js'

app.use(cors({
    credentials:true
}))

app.use(express.json({limit:"20mb"}))
app.use(cookieParser())

app.use('/api/auth',authRouter);
app.use('/api/message',messageRouter)

app.use(express.static('dist'))

const PORT=process.env.PORT;
const URL=process.env.MONGODB_URI;

server.listen(PORT,()=>{
    console.log("Server running on port",PORT);
    dbConnect(URL)
})
