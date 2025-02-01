import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {ToastService} from "../toast/toast.service";

@Component({
  selector: 'app-footer',
  template: `
    <div class="aligned">
      <div class="container">
        <div class="column">
          <div class="first-column-row1">Management</div>
        </div>
        <div class="column">
          <div class="row-header">Links</div>
          <div class="row cursor-pointer" (click)="onClickHome()">Home</div>
          <div class="row cursor-pointer" (click)="onClickProfile()">My profile</div>
          <div class="row cursor-pointer" (click)="onClickSessions()">Sessions</div>
          <div class="row cursor-pointer" (click)="onClickExperiments()">Experiments</div>
        </div>
        <div class="column">
          <div class="row-header">Contact</div>
          <div class="row">Cluj-Napoca</div>
          <div class="row">Str. Pandurilor, nr. 10</div>
          <div class="row">0741 316 184</div>
        </div>
      </div>

      <div class="aligned">
        <p>Copyright © 2024. All rights reserved.</p>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      background-color: black;
      color: white;
    }

    .column {
      padding: 10%;
      justify-content: center;
      display: grid;
      justify-items: center;
    }

    .row {
      margin-bottom: 12%;
      font-family: "Helvetica", sans-serif;
      font-size: 1.2rem;
    }

    .row-header {
      margin-bottom: 30%;
      font-family: "Helvetica", sans-serif;
      font-size: 1.5rem;
    }

    .aligned {
      background-color: black;
      color: white;
      width: 100%;
      text-align: center;
      padding-bottom: 1%;
    }

    .first-column-row1, .first-column-row2 {
      font-size: 2rem;
      font-family: "Helvetica", sans-serif;
    }

    .first-column-row1 {
      padding-top: 30%;
    }
  `]
})
export class FooterComponent {

  ///
  /// DI
  ///

  private readonly router = inject(Router);
  private readonly service = inject(LoginService);
  private readonly toast = inject(ToastService);

  /// 
  /// UI Handlers
  ///

  protected onClickHome() {
    if (this.service.isAuthenticated())
      this.router.navigate(['home']);
    else
      this.toast.showToast('Login for this action', 'warning')
  }

  protected onClickSessions() {
    if (this.service.isAuthenticated())
      this.router.navigate(['sessions']);
    else
      this.toast.showToast('Login for this action', 'warning')
  }

  protected onClickProfile() {
    if (this.service.isAuthenticated())
      this.router.navigate(['profile']);
    else
      this.toast.showToast('Login for this action', 'warning')
  }

  protected onClickExperiments() {
    if (this.service.isAuthenticated())
      this.router.navigate(['experiment-home']);
    else
      this.toast.showToast('Login for this action', 'warning')
  }

}
