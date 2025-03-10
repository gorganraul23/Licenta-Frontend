import {Injectable} from '@angular/core';
import {tap} from "rxjs";
import {environments} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastService} from "../main-app/toast/toast.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = environments.apiUrl;
  private registerUrl = environments.apiEndpoints.register;

  constructor(private http: HttpClient, private router: Router, private toast: ToastService) {}

  public register(name: string, email: string, password: string) {
    return this.http.post<any>(this.apiUrl + this.registerUrl, {name, email, password}).pipe(
      tap(response => {
        if (response.error)
          this.toast.showToast('Email already in use', 'error')
        else {
          this.router.navigate(['login']);
          this.toast.showToast('Complete registration', 'info')
        }
      })
    );
  }

}
