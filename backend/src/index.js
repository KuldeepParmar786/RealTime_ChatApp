import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js'
import {dbConnect} from './lib/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import{app,server} from './lib/socket.js'
import path from 'path';
import { fileURLToPath } from 'url';

app.use(cors({
    origin:'https://realtime-chatapp-kyax.onrender.com',
    credentials:true
}))

app.use(express.json({limit:"20mb"}))
app.use(cookieParser())

app.use('/api/auth',authRouter);
app.use('/api/message',messageRouter)



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname,'../dist')))

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

const PORT=process.env.PORT;
const URL=process.env.MONGODB_URI;

server.listen(PORT,()=>{
    console.log("Server running on port",PORT);
    dbConnect(URL)
})
