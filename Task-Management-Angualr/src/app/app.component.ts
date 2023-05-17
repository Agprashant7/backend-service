import { Component } from '@angular/core';
import { AuthService } from './service/auth/auth.sevice';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService:AuthService ,private router:Router){
    this.authService.isLoggedIn()
  }
  title = 'my-app';
  logStatus=this.authService.isLoggedIn()
  
  ngOnInit(){
    // console.log("ngOnInit",this.authService.isLoggedIn())
    this.authService.isLoggedIn()
    this.logStatus=this.authService.isLoggedIn()
  }
  ngOnChange(){
    this.authService.isLoggedIn()
  }
  

  onLogOut(){
    console.log("INSIDE LOG OUT")
    localStorage.clear()
    this.logStatus=this.authService.isLoggedIn()
    this.router.navigate(['/login'])
    
  }
}
