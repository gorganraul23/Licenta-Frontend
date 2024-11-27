import {Component, inject} from '@angular/core';
import {User} from "../nav-bar/nav-bar.component";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {idGetter} from "../../app.module";
import {ProfileService} from "../../services/profile.service";
import {ToastService} from "../toast/toast.service";

@Component({
  selector: 'app-profile',
  template: `
    <div class="container">
      <div class="left">
        <div class="left-menu">
          <div class="circle">
            <p class="initials">{{ this.getInitials(user.name) }}</p>
          </div>
          <div class="logout-div">
            <p class="name-label">{{this.user.name}}</p>
            <button mat-button class="logout-btn" (click)="onClickLogout()">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="form-container">
          <div class="title">
            <label>My info</label>
          </div>
          <div class="form">
            <form>
              <div class="info-item">
                <label class="form-label" for="name">Name</label>
                <div>
                  <input type="text" id="name" name="name" [disabled]="!editing"
                         [(ngModel)]="this.modifiedUser.name" [maxLength]="20">
                </div>
              </div>
              <div class="info-item">
                <label class="form-label" for="email">Email</label>
                <div>
                  <input type="text" id="email" name="email"
                         [disabled]="!editing" [(ngModel)]="this.modifiedUser.email" [maxLength]="30">
                </div>
              </div>
              <div>
                <button *ngIf="!editing" mat-button class="edit-btn" (click)="onClickEdit()">
                  <mat-icon>edit</mat-icon>
                  Edit
                </button>
                <button *ngIf="editing" mat-button class="edit-btn" (click)="onClickDiscard()">
                  <mat-icon>close</mat-icon>
                  Discard
                </button>
                <button mat-button class="edit-btn" (click)="onClickSave()" [disabled]="!editing">
                  <mat-icon>save</mat-icon>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      min-height: 91%;
      min-width: 100%;
      display: inline-flex;
    }

    .left {
      width: 25%;
      padding-top: 3%;
      display: block;
      background-color: white;
    }

    .right {
      width: 75%;
      background-color: rgba(205, 205, 205, 0.37);
      padding: 5%;
    }

    .initials {
      padding-top: 45%;
    }

    .left-menu {
      display: flex;
      justify-content: center;
      width: 100%;
      flex-direction: column;
      align-items: center;
    }

    .name-label {
      font-size: 1.8rem;
      font-weight: bold;
      padding-top: 10%;
      font-family: "Calibri", sans-serif;
    }

    .circle {
      height: 200px;
      width: 200px;
      border-radius: 50%;
      background: white;
      text-align: center;
      font-size: 3rem;
      font-weight: 500;
      border: 5px solid #0051CB;
    }

    /*right*/

    input[type=text] {
      width: 60%;
      padding: 1% 1% 1% 2%;
      margin: 10px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 20px;
      box-sizing: border-box;
      font-size: 20px;
    }

    .edit-btn, .logout-btn {
      width: 15%;
      background-color: #0051CB;
      border-radius: 10px;
      font-size: 15px;
      font-family: "Helvetica", sans-serif;
      color: white;
      padding: 10px 20px;
      border: none;
      margin-top: 5%;
      margin-bottom: 5%;
      margin-left: 3%;
      align-self: center;
    }

    .logout-btn {
      width: 75%;
      font-size: 20px;
      margin-left: 0;
    }

    .edit-btn:hover, .logout-btn:hover {
      background-color: #130888;
    }

    .edit-btn:disabled, .logout-btn:disabled {
      background-color: rgba(0, 50, 136, 0.37);
    }

    .logout-div {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }

    .title {
      color: black;
      font-weight: 700;
      font-size: 1.5rem;
      text-align: left;
      padding-top: 2%;
      padding-bottom: 5%;
    }

    .form-label {
      color: black;
      font-size: 1.2rem;
      font-family: "Calibri", sans-serif;
    }

    .info-item {
      padding-top: 1%;
    }
  `]
})
export class ProfileComponent {

  ///
  /// DI
  ///

  private readonly service = inject(ProfileService);
  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);
  private readonly toast = inject(ToastService);

  ///
  /// View Model
  ///

  protected user: User = {name: '', email: ''}
  protected modifiedUser: User = {name: '', email: ''}

  protected editing = false;

  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    this.loginService.getUserById(idGetter()).subscribe(res => {
      this.user.name = res.name;
      this.user.email = res.email;
      this.modifiedUser.name = res.name;
      this.modifiedUser.email = res.email;
    })
  }

  /// 
  /// UI Handlers
  ///

  protected getInitials = (name: string | undefined) => {
    return name?.split(" ").map((n) => n[0]).join("");
  }

  protected onClickLogout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  protected onClickEdit() {
    this.editing = true;
  }

  protected onClickDiscard() {
    this.editing = false;
    this.modifiedUser.name = this.user.name;
    this.modifiedUser.email = this.user.email;
  }

  protected onClickSave() {
    this.editing = false;
    this.service.updateProfile(this.modifiedUser).subscribe(res => {
      this.user = res;
      this.toast.showToast('Account updated', 'info')
    })
  }

}
