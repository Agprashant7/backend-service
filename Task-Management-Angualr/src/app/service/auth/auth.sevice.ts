import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'src/app/model/login';
import { map } from 'rxjs/operators';
import { SignUp } from 'src/app/model/signUp';
@Injectable({
    providedIn: 'root',
  })

export class AuthService {
    serviceURL:string; 
    constructor(
        private router: Router,
        private http:HttpClient
    ) {
        this.serviceURL='http://localhost:5000/api/'
    }

    login(data: Login):Observable<Login> {
        return this.http.post<Login>(`${this.serviceURL}signin`,data, {observe: 'response' as 'body'})
    }

    signUp(data:SignUp):Observable<SignUp> {
        return this.http.post<SignUp>(`${this.serviceURL}signup`,data, {observe: 'response' as 'body'})
    }
    
    isLoggedIn(): boolean {
        let token = localStorage.getItem('token');
        // let password=localStorage.getItem('password');
        return token? true:false
      }
  }