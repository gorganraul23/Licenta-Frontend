import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {ToastService} from "../toast/toast.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private router: Router, private service: LoginService, private toast: ToastService) {
  }

  onClickHome() {
    if (this.service.isAuthenticated())
      this.router.navigate(['home']);
    else
      this.toast.showToast('Intrati in cont pentru aceasta actiune', 'warning')
  }

  onClickSessions() {
    if (this.service.isAuthenticated())
      this.router.navigate(['sessions']);
    else
      this.toast.showToast('Intrati in cont pentru aceasta actiune', 'warning')
  }

  onClickProfile() {
    if (this.service.isAuthenticated())
      this.router.navigate(['profile']);
    else
      this.toast.showToast('Intrati in cont pentru aceasta actiune', 'warning')
  }

}
