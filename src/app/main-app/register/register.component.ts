import {Component} from '@angular/core';
import {UserCreation} from "../../services/login.service";
import {Router} from "@angular/router";
import {ToastService} from "../toast/toast.service";
import {RegisterService} from "../../services/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: UserCreation = {name: '', email: '', password: ''}

  constructor(private service: RegisterService, private router: Router, private toast: ToastService) {
  }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  register() {
    if (this.user.email == '' || this.user.password == '' || this.user.name == '')
      this.toast.showToast('Campuri incomplete', 'warning')
    else {
      this.service.register(this.user.name, this.user.email, this.user.password).subscribe(res => {
      });
    }
  }
}
