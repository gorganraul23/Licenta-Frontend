import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./main-app/login/login.component";
import {HomePageComponent} from "./main-app/home-page/home-page.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
