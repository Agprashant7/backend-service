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
const port=5000;
const start=async()=>{
    try{
        await connectDB();
        app.listen(port,()=>{
            console.log(`Server Up and running on ${port}`)
        })
    }
    catch(err){
        console.log(`Error while connecting to server`,err)
    }
}
start()