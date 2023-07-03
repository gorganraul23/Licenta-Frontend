import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../environments/environments";
import {Observable} from "rxjs";

export interface Session {
  id: string,
  start_time: Date | null,
  end_time: Date | null,
  reference: number
}

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  apiUrl = environments.apiUrl;
  session = environments.apiEndpoints.session;

  constructor(private http: HttpClient) {
  }

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.apiUrl + this.session);
  }

  deleteSession(id: string): Observable<null> {
    return this.http.delete<null>(this.apiUrl + this.session + '/' + id + '/');
  }

  getSessionById(id: string): Observable<Session> {
    return this.http.get<Session>(this.apiUrl + this.session + '/' + id + '/');
  }

}
