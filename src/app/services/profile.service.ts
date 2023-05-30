import { Injectable } from '@angular/core';
import {environments} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {User} from "../main-app/nav-bar/nav-bar.component";
import {Observable} from "rxjs";
import {idGetter} from "../app.module";

export interface UserUpdate{
  id: string,
  name: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiUrl = environments.apiUrl

  constructor(private http: HttpClient) { }

  updateProfile(user: User): Observable<User>{
    const userUrl = environments.apiEndpoints.users;
    const userUpdate : UserUpdate = {id: idGetter(), name: user.name, email: user.email};
    return this.http.put<UserUpdate>(this.apiUrl + userUrl + idGetter() + '/', userUpdate);
  }
}
