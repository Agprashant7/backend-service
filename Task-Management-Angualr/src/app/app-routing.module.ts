import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './helpers/auth-guard.guard';
import { TaskmanageComponent } from './component/manage/taskmanage/taskmanage.component';
import { SignupComponent } from './component/signup/signup.component';

const routes: Routes = [
  
  {
    path: '',
    redirectTo:'/login',
    pathMatch:'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'manageTask',
    component: TaskmanageComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'signup',
    component:SignupComponent
  }
]
// const routes:Routes=[]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
