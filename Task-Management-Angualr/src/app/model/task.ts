export class Task {
    taskId!:string;
    taskName:string=''
    date!: Date | string;
    dueDate!:Date;
    status:string='Assigned';
    comment:string='';
    lastModified: Date | '' = "";
}
