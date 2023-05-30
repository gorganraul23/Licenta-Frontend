import {Component} from '@angular/core';
import {User} from "../nav-bar/nav-bar.component";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {idGetter} from "../../app.module";
import {ProfileService} from "../../services/profile.service";
import {ToastService} from "../../toast/toast.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: User = {name: '', email: ''}
  modifiedUser: User = {name: '', email: ''}

  editing = false;

  constructor(private loginService: LoginService, private service: ProfileService, private router: Router,
              private toast: ToastService) {
  }

  ngOnInit(): void {
    this.loginService.getUserById(idGetter()).subscribe(res => {
      this.user.name = res.name;
      this.user.email = res.email;
      this.modifiedUser.name = res.name;
      this.modifiedUser.email = res.email;
    })
  }

  getInitials = (name: string | undefined) => {
    return name?.split(" ").map((n) => n[0]).join("");
  }

  onClickLogout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  onClickEdit() {
    this.editing = true;
  }

  onClickAnuleaza() {
    this.editing = false;
    this.modifiedUser.name = this.user.name;
    this.modifiedUser.email = this.user.email;
  }

  onClickSave() {
    this.editing = false;
    this.service.updateProfile(this.modifiedUser).subscribe(res => {
      this.user = res;
      this.toast.showToast('Informatii actualizate', 'info', true)
    })
  }

}
