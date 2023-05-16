const mongoose = require("mongoose");


const taskSchema=new mongoose.Schema({
    taskId:{
        type:String,
        require:true,
        index:true
        // unique:true,
    },
    userId:{
        type:String,
    },
    taskName:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default: new Date
    },
    dueDate:{
        type:Date,
        require:true
    },
    status:{
        type:String,
        default:'Assigned'
    },
    comment:{
        type:String,
    },
    lastModified:{
        type:Date
    }

})
module.exports=mongoose.model('Task',taskSchema)