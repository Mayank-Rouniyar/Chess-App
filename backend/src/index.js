
import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';
import connectDB from './db/index.js';
import dotenv from 'dotenv';
dotenv.config({
  path: './.env'
});
import { app } from './app.js';
connectDB()
.then(()=>{
  app.on("error",(error)=>{
    console.log("We are facing Error:", error);
  })
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`App is listening at port :${process.env.PORT}`);
  })
})
.catch((err)=>{
  console.log("MONGO DB CONNECTION FAILED", err);
})