import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./main-app/login/login.component";
import {HomePageComponent} from "./main-app/home-page/home-page.component";
import {AuthGuard} from "./guards/auth.guard";
import {SessionsComponent} from "./main-app/sessions/sessions.component";
import {ProfileComponent} from "./main-app/profile/profile.component";
import {SessionStatisticsComponent} from "./main-app/sessions/session-statistics/session-statistics.component";
import {RegisterComponent} from "./main-app/register/register.component";

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
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sessions',
    component: SessionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sessions/:id',
    component: SessionStatisticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
