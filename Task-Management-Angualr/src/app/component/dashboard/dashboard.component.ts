import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { AuthService } from 'src/app/service/auth/auth.sevice';
import { CrudService } from 'src/app/service/crud/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  taskObj:Task=new Task();
  taskArr:Task[]=[]
  addTaskValue:string='';
  addDueDate!:Date;
  editTaskValue:string='';

  constructor(private crudService:CrudService,private authService:AuthService){
 
  }

  ngOnInit():void{
    this.taskObj=new Task();
    // this.taskArr=[];
    this.getAllTask();
    this.editTaskValue=''
  }

  getAllTask(){
    this.crudService.getAllTask().subscribe((res:any)=>{
   
      this.taskArr=res.data;
    },err=>{
      alert("UNABLE TO GET LIST")
    })
  }
  addTask(){
    this.taskObj.taskName=this.addTaskValue;
    this.taskObj.dueDate=this.addDueDate;
    this.taskObj.date=new Date()
    this.crudService.addTasks(this.taskObj).subscribe(res=>{
       this.ngOnInit();
      this.addTaskValue=''
      this.addDueDate
    },err=>{
      alert(err)
    })

  }

  editTask(taskObj:Task){
   
    // this.taskObj.task_name=this.editTaskValue
    this.crudService.editTask(taskObj).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("FAILDED TO EDIT")
    })
  }

  deleteTask(task:Task){
    this.taskObj=task
    // console.log(task)
    this.crudService.deleteTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("FAILDED TO Delete")
    })
  }

  // call(etask:Task){
  //   this.taskObj=etask
  //   this.editTaskValue=etask.task_name
  // }

 
}
