import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.sevice';
import { Router } from '@angular/router';
import { ToasterService, toastPayload } from '../../service/common/toaster.service';
import { IndividualConfig } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public signupForm!: FormGroup;
  errorMessage=''
  toast!: toastPayload;
  constructor(private fb: FormBuilder,private authService:AuthService,
     private router: Router,private toaster: ToasterService){
      // this.myForm();
  }
  
  ngOnInit(): void {
    this.signupForm = new FormGroup({
        firstName:new FormControl('',[Validators.required]),
        lastName:new FormControl('',[Validators.required]),
        contactNo:new FormControl('',[Validators.required]),
        email: new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
    // localStorage.clear()
}
showToaster(type: string,message:string,title:string) {
  this.toast = {
    message: message,
    title:title,
    type: type,
    ic: {
      timeOut: 2500,
      closeButton: true,
    } as IndividualConfig,
  };
  this.toaster.showToast(this.toast);
}
onSubmit(){
  console.log("SIGNUPFORM",this.signupForm)
  if(this.signupForm.value.confirmPassword!==this.signupForm.value.password){
    return
  }
  const {firstName,lastName,contactNo,email,password}=this.signupForm.value
  const data={firstName,lastName,contactNo,email,password}
  console.log(data)
  this.authService.signUp(data).subscribe((res:any)=>{
    console.log("Response",res)
    this.showToaster('success',res.body.message,'Success')
    this.router.navigate(['/login'])
  },err=>{
   this.errorMessage=err.error.message
   this.showToaster('error',err.error.message,'Error')
  })
}

}
