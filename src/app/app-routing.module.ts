import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./main-app/login/login.component";
import {HomePageComponent} from "./main-app/home-page/home-page.component";
import {AuthGuard} from "./guards/auth.guard";
import {SessionsComponent} from "./main-app/sessions/sessions.component";
import {ProfileComponent} from "./main-app/profile/profile.component";
import {SessionStatisticsComponent} from "./main-app/sessions/session-statistics/session-statistics.component";
import {RegisterComponent} from "./main-app/register/register.component";
import { ExperimentHomeComponent } from './main-app/experiment/experiment-home.component';
import { ExperimentComponent } from './main-app/experiment/experiment-pages/experiment.component';
import { RelaxPage1Component } from './main-app/experiment/experiment-pages/relax-page1/relax-page1.component';
import { RelaxPage2Component } from './main-app/experiment/experiment-pages/relax-page2/relax-page2.component';
import { RelaxPage3Component } from './main-app/experiment/experiment-pages/relax-page3/relax-page3.component';
import { RelaxPage4Component } from './main-app/experiment/experiment-pages/relax-page4/relax-page4.component';
import { CoglPage1Component } from './main-app/experiment/experiment-pages/cogl-page1/cogl-page1.component';
import { CoglPage2Component } from './main-app/experiment/experiment-pages/cogl-page2/cogl-page2.component';
import { CoglPage3Component } from './main-app/experiment/experiment-pages/cogl-page3/cogl-page3.component';

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
  {
    path: 'experiment-home',
    component: ExperimentHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiment',
    component: ExperimentComponent,
    canActivate: [AuthGuard],
    children:[
      { 
        path: 'relax1', 
        component: RelaxPage1Component,
        canActivate: [AuthGuard]
      },
      { 
        path: 'cogl1', 
        component: CoglPage1Component,
        canActivate: [AuthGuard]
      },
      { 
        path: 'relax2', 
        component: RelaxPage2Component,
        canActivate: [AuthGuard] 
      },
      { 
        path: 'cogl2', 
        component: CoglPage2Component,
        canActivate: [AuthGuard]
      },
      { 
        path: 'relax3', 
        component: RelaxPage3Component,
        canActivate: [AuthGuard]
      },
      { 
        path: 'cogl3', 
        component: CoglPage3Component,
        canActivate: [AuthGuard]
      },
      { 
        path: 'relax4', 
        component: RelaxPage4Component,
        canActivate: [AuthGuard]
      },
      { 
        path: '', 
        redirectTo: 'relax1', 
        pathMatch: 'full' 
      },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
