import express from "express";
import { initdb } from "./database/connection.js";
import dotenv from "dotenv";
import { userRouter } from "./Router/userRouter.js";
dotenv.config();
const PORT=process.env.PORT || 8080;
const app=express();

//globel MiddleWare
app.use(express.json());

app.use((req,res,next)=>{
  console.log(req.url);
  console.log(req.method);
  next();
 })

 //API
 app.use("/api/user",userRouter);


 // Connection DataBase
 initdb().then(()=>{
   app.listen(PORT,()=>{
      console.log(`the server is run at ${PORT}`)
   })
 }).catch((e)=>{
   console.log(e)
 })