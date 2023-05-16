const { StatusCodes } = require("http-status-codes");
const Task=require('../models/tasksModal');
const shortid = require("shortid");


const addTask=async (req,res)=>{
    const {taskName,date,dueDate,comment,status,lastModified,userId}=req.body
    const taskId=shortid()
    const data={taskName,date,dueDate,status,comment,lastModified,taskId,userId}
    const task=await Task.create(data).then((data)=>{
        res.status(StatusCodes.OK).json({message:'Successfully added'})
    }).catch((err)=>{
        console.log("ERROR WHILE ADDING TASK",err)
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "ERROR WHILE ADDING TASK",
            error:err
        })
    })
}
const getTask=async (req,res)=>{

    const task=await Task.find({userId:req.body.userId}).then((data)=>{
        res.status(StatusCodes.OK).json({message:'Successfully Fetched Tasks',data})
    }).catch((err)=>{
        console.log("ERROR WHILE FETCHING TASK",err)
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "ERROR WHILE FETCHING TASK",
            error:err
        })
    })
}
const editTask=async (req,res)=>{
    var update={ $set: {        
        taskName:req.body.taskName,
        date:req.body.date,
        dueDate:req.body.dueDate,
        status:req.body.status,
        comment:req.body.comment,
    }
}
    const task=await Task.update({taskId:req.body.taskId},update).then((data)=>{
        res.status(StatusCodes.OK).json({message:'Updated Succesfully',data})
    }).catch((err)=>{
        console.log("ERROR WHILE UPDATING TASK",err)
    })
}
const deleteTask=async (req,res)=>{
    const task=await Task.deleteOne({taskId:req.query.id}).then((data)=>{
        res.status(StatusCodes.OK).json({message:'DELEDTED TASK',data})
    }).catch((err)=>{
        console.log("ERROR WHILE DELETING TASK",err)
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "ERROR WHILE DELETING TASK",
            error:err
        })
    })
}
module.exports={addTask,getTask,editTask,deleteTask}