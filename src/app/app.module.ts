import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {LoginComponent} from './main-app/login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {NavBarComponent} from './main-app/nav-bar/nav-bar.component';
import {JwtModule} from "@auth0/angular-jwt";
import {LoginService} from "./services/login.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {HomePageComponent} from './main-app/home-page/home-page.component';
import {MaterialModule} from "./material.module";
import {FooterComponent} from "./main-app/footer/footer.component";
import {SessionsComponent} from "./main-app/sessions/sessions.component";
import {NgChartsModule} from "ng2-charts";
import {ProfileComponent} from "./main-app/profile/profile.component";
import {SessionStatisticsComponent} from "./main-app/sessions/session-statistics/session-statistics.component";
import {DatePipe, DecimalPipe} from "@angular/common";
import {ToastComponent} from "./main-app/toast/toast.component";
import {RegisterComponent} from "./main-app/register/register.component";
import {DeleteSessionComponent} from "./main-app/sessions/delete-session/delete-session.component";

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export function idGetter() {
  return localStorage.getItem('user_id')!;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    HomePageComponent,
    FooterComponent,
    SessionsComponent,
    ProfileComponent,
    SessionStatisticsComponent,
    ToastComponent,
    RegisterComponent,
    DeleteSessionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    NgChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
  ],
  providers: [
    LoginService,
    DatePipe,
    DecimalPipe,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
