import express from 'express'
import {protectRoute} from '../middlewares/auth.middleware.js'
import {userforSidebar,getMessages,sendMessage} from '../controllers/message.controller.js'
import multer from 'multer'

const Router=express.Router()

const upload=multer({dest:'uploads/'}) 

Router.get('/users',protectRoute,userforSidebar)
Router.get('/:id',protectRoute,getMessages)
Router.post('/send/:id',protectRoute,upload.single('image'),sendMessage)

export default Router