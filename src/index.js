require('dotenv').config()
const express=require('express')
const mongoose = require('./db/connect');
const app=express();
const cors=require('cors');
const connectDB = require('./db/connect');
const authRouter=require('./routes/auth');
const taskRouter=require('./routes/task')
app.use(cors());
app.use(express.json())
app.use('/api',authRouter)
app.use('/task',taskRouter)
const port=process.env.PORT||5000
const start=async()=>{
    try{
        await connectDB();
        if(process.env.NODE_ENV="production"){
            app.use(express.static("Task-Management-Angualr/dist/my-app"))
            const path=require("path");
            app.get('*',(req,res)=>{
                res.sendFile(path.resolve(__dirname,'Task-Management-Angualr','dist','my-app','index.html'))
            })
        }
        app.listen(port,()=>{
            console.log(`Server Up and running on ${port}`)
        })
    }
    catch(err){
        console.log(`Error while connecting to server`,err)
    }
}
start()