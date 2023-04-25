import {Injectable} from '@angular/core';
import {environments} from "../../environments/environments";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {User} from "../main-app/nav-bar/nav-bar.component";

export interface UserCredentials {
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

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    const loginUrl = environments.apiEndpoints.login;
    return this.http.post<any>(this.apiUrl + loginUrl, {email, password}).pipe(
      tap(response => {
        sessionStorage.setItem('access_token', response.access_token);
        sessionStorage.setItem('user_id', response.user_id);
      })
    );
  }

  getUserById(id: string): Observable<User>{
    const usersUrl = environments.apiEndpoints.users;
    return this.http.get<User>(this.apiUrl + usersUrl + id + '/');
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user_id');
    this.isLoggedIn = false
  }

  getToken() {
    const token = sessionStorage.getItem('access_token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return token;
    } else {
      this.logout();
      return null;
    }
  }

  isAuthenticated() {
    return !!this.getToken();
  }

}
