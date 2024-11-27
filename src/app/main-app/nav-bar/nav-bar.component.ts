import {Component, inject, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {idGetter} from "../../app.module";

export interface User {
  name: string,
  email: string
}

@Component({
  selector: 'app-nav-bar',
  template: `
    <mat-toolbar class="mat-elevation-z4">
      <button mat-button class="btn" (click)="onClickHomeBtn()">Management</button>
      <span class="right-side"></span>
      <button mat-button class="btn" (click)="onClickHomeBtn()">Home</button>
      <button mat-button class="btn" (click)="onClickSessionsBtn()">Sessions</button>
      <button mat-button class="btn" (click)="onClickExperimentsBtn()">Experiments</button>
      <button mat-button class="account-btn"
          [matMenuTriggerFor]="menu1">
        <mat-icon>perm_identity</mat-icon>
        My account
      </button>
      <mat-menu #menu1="matMenu">
        <button mat-menu-item (click)="onClickProfileBtn()">My profile</button>
        <button mat-menu-item (click)="onClickLogoutBtn()">Log out</button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [`
    .right-side {
      flex: 1 1 auto;
    }
    
    mat-toolbar {
      min-height: 9%;
      background-color: black;
      color: white;
      align-content: center;
    }
    
    .account-btn {
      background-color: #0051CB;
      border-radius: 10px;
      font-size: 20px;
      font-family: "Helvetica", sans-serif;
      min-height: 60%;
    }
    
    .account-btn:hover {
      background-color: #130888;
    }
    
    .btn {
      font-size: 20px;
      font-family: "Calibri", sans-serif;
      margin-right: 2%;
    }
  `]
})
export class NavBarComponent implements OnInit {

  ///
  /// DI
  ///

  private readonly service = inject(LoginService);
  private readonly router = inject(Router);

  ///
  /// View Model
  ///

  protected user: User = {name: '', email: ''};
  public isAuthenticated = false;

  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    if (idGetter()) {
      this.service.getUserById(localStorage.getItem('user_id')!).subscribe(res => {
        this.user = res;
      })
    }
  }

  /// 
  /// UI Handlers
  ///

  protected getInitials = (name: string | undefined) => {
    return name?.split(" ").map((n) => n[0]).join("");
  }

  protected onClickLogoutBtn() {
    this.service.logout();
    this.router.navigate(['login']);
  }

  protected onClickProfileBtn() {
    this.router.navigate(['profile']);
  }

  protected onClickHomeBtn() {
    this.router.navigate(['home']);
  }

  protected onClickSessionsBtn() {
    this.router.navigate(['sessions']);
  }

  protected onClickExperimentsBtn() {
    this.router.navigate(['experiment-home']);
  }

}
