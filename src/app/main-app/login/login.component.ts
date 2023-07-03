import {Component} from '@angular/core';
import {LoginService, UserCredentials} from "../../services/login.service";
import {Router} from "@angular/router";
import {ToastService} from "../toast/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: UserCredentials = {email: '', password: ''}

  constructor(private service: LoginService, private router: Router, private toast: ToastService) {
  }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  login() {
    if(this.user.email == '' || this.user.password == '')
      this.toast.showToast('Campuri incomplete', 'warning')
    else {
      this.service.login(this.user.email, this.user.password).subscribe(res => {
        if (this.service.isAuthenticated()) {
          this.service.isLoggedIn = true
          this.router.navigate(['home']);
        }
      });
    }
  }

}
