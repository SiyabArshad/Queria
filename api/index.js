const connection =require('./config/conn')
const express=require('express')
const dotenv=require('dotenv')
const auth=require('./routes/Auth')
const users=require('./routes/user')
const posts=require('./routes/post')
connection()
dotenv.config()
const app=express()
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.json())
app.use("/queria",auth)
app.use("/queria",users)
app.use("/queria",posts)
app.listen(5000,()=>{
    console.log('backend is running')
})