import { HttpClient,HttpHeaders,HttpParams   } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../model/task';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  
  serviceURL:string;  
  constructor(private http:HttpClient) { 
    // this.serviceURL='https://643fd869b9e6d064be006110.mockapi.io/tasks/task'
    this.serviceURL='http://localhost:5000/task'

  }

  addTasks(task:Task):Observable<Task>{
     let headers = new Headers();
     let token =  localStorage.getItem('token');
  
    return this.http.post<Task>(`${this.serviceURL}/addTask`,task,{
      headers: new HttpHeaders().set('Authorization',token?token:'')
  })
  }
  getAllTask():Observable<Task[]>{
    let headers = new Headers();
    let token =  localStorage.getItem('token');
    return this.http.get<Task[]>(`${this.serviceURL}/getTask`,{
      headers: new HttpHeaders().set('Authorization',token?token:'')
  })
  }
  deleteTask(task:Task):Observable<Task>{
    const params = new HttpParams()
    .set('id', task.taskId)
    
    let headers = new Headers();
    let token =  localStorage.getItem('token');
    return this.http.delete<Task>(this.serviceURL+'/deleteTask',{
      headers: new HttpHeaders().set('Authorization',token?token:''),params
  },)
  }
  editTask(task:Task):Observable<Task>{
    let headers = new Headers();
    let token =  localStorage.getItem('token');
    return this.http.put<Task>(this.serviceURL+'/editTask',task,{
      headers: new HttpHeaders().set('Authorization',token?token:'')
  })
  }
}
