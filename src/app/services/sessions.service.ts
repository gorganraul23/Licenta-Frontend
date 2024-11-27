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

export interface SensorData {
  hrv: number,
}

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  apiUrl = environments.apiUrl;
  session = environments.apiEndpoints.session;

  constructor(private http: HttpClient) {}

  public getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.apiUrl + this.session);
  }

  public deleteSession(id: string): Observable<null> {
    return this.http.delete<null>(this.apiUrl + this.session + '/' + id + '/');
  }

  public getSessionById(id: string): Observable<Session> {
    return this.http.get<Session>(this.apiUrl + this.session + '/' + id + '/');
  }

  public getDataBySession(id: string) {
    const sensorData = environments.apiEndpoints.sensorData;
    return this.http.get<SensorData[]>(this.apiUrl + sensorData + id + '/');
  }

  public getSessionRunning(): Observable<Session> {
    const sessionRunning = environments.apiEndpoints.sessionRunning;
    return this.http.get<Session>(this.apiUrl + sessionRunning);
  }

}
