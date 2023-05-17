import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.sevice';
import { Router } from '@angular/router';
import { ToasterService, toastPayload } from '../../service/common/toaster.service';
import { IndividualConfig } from 'ngx-toastr';
@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    public loginForm!: FormGroup;
    errorMessage=''
    toast!: toastPayload;
    constructor(private fb: FormBuilder,private authService:AuthService, 
        private router: Router,private toaster: ToasterService){
        // this.myForm();
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

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('',[Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(4)]),
        });
        localStorage.clear()
    }
    
    // myForm() {
    //     this.loginForm = this.fb.group({
    //     email: ['', [ Validators.required,Validators.email] ],
    //     password: ['', Validators.required ,Validators.minLength(4)],
    //     });
    //  }
    onSubmit() {
        const email=this.loginForm.get('email')!.value
        const password= this.loginForm.get('password')!.value
        const data={ email,password }
        this.authService.login(data).subscribe((res:any)=>{
         let successMessage=`Welcome ${res.body.user.firstName}`
        //  console.log("RESPONSE",res.headers.get('auth'))
         localStorage.setItem('token',res.headers.get('token'));
         this.authService.isLoggedIn()
         this.showToaster('success',successMessage,'Success')
         this.router.navigate(['/home'])
        },err=>{
            console.log("ERROR WHILE LOGGIN",err.error.message)
            this.errorMessage=err.error.message
            this.showToaster('error',err.error.message,'Error')
    //   alert(err)
    });
   
    // this.redirect()
      }
}