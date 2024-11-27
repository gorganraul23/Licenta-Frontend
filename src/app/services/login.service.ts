import {Injectable} from '@angular/core';
import {environments} from "../../environments/environments";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {User} from "../main-app/nav-bar/nav-bar.component";
import {ToastService} from "../main-app/toast/toast.service";

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserCreation {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environments.apiUrl;
  private jwtHelper = new JwtHelperService();
  isLoggedIn = false;

  constructor(private http: HttpClient, private toast: ToastService) {
  }

  public login(email: string, password: string) {
    const loginUrl = environments.apiEndpoints.login;
    return this.http.post<any>(this.apiUrl + loginUrl, {email, password}).pipe(
      tap(response => {
        if (response.error)
          this.toast.showToast('Incorect credentials ', 'error')
        else {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user_id', response.user_id);
        }
      })
    );
  }

  public getUserById(id: string): Observable<User> {
    const usersUrl = environments.apiEndpoints.users;
    return this.http.get<User>(this.apiUrl + usersUrl + id + '/');
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    this.isLoggedIn = false
  }

  public getToken() {
    const token = localStorage.getItem('access_token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return token;
    } else {
      this.logout();
      return null;
    }
  }

  public isAuthenticated() {
    return !!this.getToken();
  }

}
