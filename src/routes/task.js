const express=require('express')
const {addTask,getTask,editTask, deleteTask} = require('../controller/task')
const verifyToken = require('../middleware/verifyToken')
const router=express.Router()


router.route('/addTask').post(verifyToken,addTask)
router.route('/getTask').get(verifyToken,getTask)
router.route('/deleteTask').delete(verifyToken,deleteTask)
router.route('/editTask').put(verifyToken,editTask)
module.exports=router