import express from "express";
import {protectRoute} from '../middlewares/auth.middleware.js'
import{login,signup,logout,updateProfile,checkAuth} from '../controllers/auth.controllers.js'

const Router=express.Router();

Router.post('/login',login);
Router.post('/signup',signup);
Router.post('/logout',logout);
Router.put('/updateprofile',protectRoute,updateProfile)
Router.get('/checkAuth',protectRoute,checkAuth)

export default Router;