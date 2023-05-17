import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud/crud.service';
import { IN_PROGRESS,COMPLETED,BLOCKED } from 'src/app/helpers/statusConstants';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-taskmanage',
  templateUrl: './taskmanage.component.html',
  styleUrls: ['./taskmanage.component.css']
})
export class TaskmanageComponent {
  taskArr:Task[]=[]
  taskObj=new Task();
  taskComment!:string;
  public commentForm!: FormGroup;
  // constArr:any[]=[COMPLETED,BLOCKED,IN_PROGRESS]
  constructor(private crudService:CrudService){
    // console.log(this.constArr)

  }
  ngOnInit(){
    this.getAllTask()
    this.commentForm = new FormGroup({
      comment: new FormControl('',[Validators.required,]),
  });
  }

  call(task:Task){
    this.taskComment=task.comment
  }

  getAllTask(){
    this.crudService.getAllTask().subscribe((res:any)=>{
      this.taskArr=res.data;
    },err=>{
      alert("UNABLE TO GET LIST")
    })
  }

  updateStatus(task:Task,status:string){
    this.taskObj=task;
    this.taskObj.status=status
    this.taskObj.lastModified=new Date()
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("FAILDED TO UPDATE STATUS")
    })
  }

  updateComment(task:Task){
    this.taskObj=task;
    this.taskObj.comment=this.commentForm.get('comment')!.value,
    this.taskObj.lastModified=new Date()
    console.log("TASK COMMENT",this.taskObj.comment)
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("FAILDED TO UPDATE COMMENT")
    })

  }
  getFontColor(status:string) { (2)
    switch (status) {
      case IN_PROGRESS:
        return 'orange';
      case COMPLETED:
        return 'green';
      case BLOCKED:
        return 'red';
        default:
        return 'black'
    }
  }
}
