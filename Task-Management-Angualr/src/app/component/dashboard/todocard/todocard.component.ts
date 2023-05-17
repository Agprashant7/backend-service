import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/model/task';



@Component({
    selector: 'app-todocard',
    templateUrl: './todocard.component.html',
    // styleUrls: ['./todocard.component.css']
  })

  export class TodoCardCompnent{
   @Input()taskArray! :Task[]
   @Output()deleteObj:EventEmitter<any>=new EventEmitter()
   @Output()editObj:EventEmitter<any>=new EventEmitter()
  
  
   taskObj:Task=new Task();
   taskArr:Task[]=[]
   addTaskValue:string='';
   editTaskValue:string='';
   editDueDate:Date=new Date()

   constructor(){
   }
  //  @Output() call=new EventEmitter();
  ngOnInit():void{
  }

  //ngOnChanges triggers following the modification of @Input bound class members. 
  //Data bound by the @Input() decorator come from an external source. When the external 
  //source alters that data in a detectable manner, it passes through the @Input property again.

  ngOnChanges(){

    this.taskArr=this.taskArray
  }

  deleteTask(task:Task){
    this.deleteObj.emit(task)
  }

  editTask(){
    this.taskObj.taskName=this.editTaskValue
    this.taskObj.dueDate=this.editDueDate
    this.editObj.emit(this.taskObj)
  }

  call(etask:Task){
    this.taskObj=etask
    this.editTaskValue=etask.taskName
    this.editDueDate=etask.dueDate
  }
  }