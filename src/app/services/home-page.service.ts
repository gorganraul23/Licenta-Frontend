import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../environments/environments";
import {Observable} from "rxjs";

export interface ChartData {
  hr: number,
  hrv: number
}

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  apiUrl = environments.apiUrl

  constructor(private http: HttpClient) {
  }

  getData(): Observable<ChartData>{
    return this.http.get<ChartData>(this.apiUrl)
  }
}
