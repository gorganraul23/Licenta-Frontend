import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { idGetter } from '../app.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  apiUrl = environments.apiUrl

  constructor(private http: HttpClient) {}

  public saveExperimentResponse(sessionId: string, activity: string, question: string, response: string): Observable<boolean> {
    const saveExperimentUrl = environments.apiEndpoints.saveExperiment;
    const experimentToSave = {userId: idGetter(), sessionId: sessionId, activity: activity, questionId: question, userResponse: response }
    return this.http.post<boolean>(this.apiUrl + saveExperimentUrl, experimentToSave);
  }

  public saveExperimentStartTime(): Observable<boolean> {
    const saveExperimentStartTimeUrl = environments.apiEndpoints.saveExperimentTime;
    return this.http.post<boolean>(this.apiUrl + saveExperimentStartTimeUrl, {});
  }

}
