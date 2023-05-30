import {Injectable} from '@angular/core';
import {tap} from "rxjs";
import {environments} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastService} from "../toast/toast.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = environments.apiUrl;
  private registerUrl = environments.apiEndpoints.register;

  constructor(private http: HttpClient, private router: Router, private toast: ToastService) {
  }

  register(name: string, email: string, password: string) {
    console.log(name, email, password)
    return this.http.post<any>(this.apiUrl + this.registerUrl, {name, email, password}).pipe(
      tap(response => {
        if(response.error)
          this.toast.showToast('Email deja folosit', 'error')
        else {
          this.router.navigate(['login']);
          this.toast.showToast('Inregistrare completa', 'info')
        }
      })
    );
  }

}
