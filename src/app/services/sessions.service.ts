import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../environments/environments";
import {Observable} from "rxjs";

export interface Session{
  id: string,
  start_time: Date,
  end_time: Date
}

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  apiUrl = environments.apiUrl;

  constructor(private http: HttpClient) { }

  getSessions(): Observable<Session[]>{
    const sessions = environments.apiEndpoints.session;
    return this.http.get<Session[]>(this.apiUrl + sessions);
  }
}
