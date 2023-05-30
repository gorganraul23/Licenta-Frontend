import {Component} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {idGetter} from "../../app.module";

export interface User {
  name: string,
  email: string
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  user: User = {name: '', email: ''};
  isAuthenticated = false;

  constructor(private service: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    if (idGetter()) {
      this.service.getUserById(sessionStorage.getItem('user_id')!).subscribe(res => {
        this.user = res;
        console.log(this.user);
      })
    }
  }

  getInitials = (name: string | undefined) => {
    return name?.split(" ").map((n) => n[0]).join("");
  }

  onClickLogoutBtn() {
    this.service.logout();
    this.router.navigate(['login']);
  }

  onClickProfileBtn() {
    this.router.navigate(['profile']);
  }

  onClickHomeBtn() {
    this.router.navigate(['home']);
  }

  onClickSessionsBtn() {
    this.router.navigate(['sessions']);
  }
}
