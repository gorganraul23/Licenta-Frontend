import {Component, inject, OnInit} from '@angular/core';
import {LoginService, UserCredentials} from "../../services/login.service";
import {Router} from "@angular/router";
import {ToastService} from "../toast/toast.service";

@Component({
  selector: 'app-login',
  template: `
    <div class="flex h-screen">
      <div class="w-3/5 bg-cover bg-center" style="background-image: url('../../assets/cognitive.png');"></div>
      <div class="w-2/5 bg-gray-200 bg-opacity-80 flex items-center">
        <div class="w-full px-20">
          <div class="text-center">
            <p class="text-xl font-semibold text-black mt-10">Welcome!</p>
          </div>
          <div class="text-center mb-10">
            <p class="text-2xl font-extrabold text-black mt-4">Sign In</p>
          </div>
          <form>
            <div class="mb-6">
              <label for="email" class="block text-lg font-medium text-black">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                autocomplete="email"
                [(ngModel)]="this.user.email"
                class="w-full h-10 px-4 py-2 mt-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
            <div class="mb-6">
              <label for="password" class="block text-lg font-medium text-black">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                autocomplete="off"
                [(ngModel)]="this.user.password"
                class="w-full h-10 px-4 py-2 mt-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
            <div class="flex justify-center">
              <button
                type="button"
                class="w-2/6 bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-400"
                (click)="login()"
                [disabled]="this.user.email == '' || this.user.password == ''"
              >
                Continue
              </button>
            </div>
          </form>
          <div class="flex justify-center mt-6">
            <p class="text-black text-lg font-medium">
              New here?
              <a href="/register" class="text-blue-600 underline hover:text-blue-800">Create an account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: []
})
export class LoginComponent implements OnInit {

  ///
  /// DI
  ///

  private readonly router = inject(Router);
  private readonly service = inject(LoginService);
  private readonly toast = inject(ToastService);
  
  ///
  /// View Model
  ///

  protected user: UserCredentials = {email: '', password: ''}
  
  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    localStorage.clear();
  }

  /// 
  /// UI Handlers
  ///

  protected login(): void {
    if (this.user.email == '' || this.user.password == '')
      this.toast.showToast('Incomplete fields', 'warning')
    else {
      this.service.login(this.user.email, this.user.password).subscribe(res => {
        if (this.service.isAuthenticated()) {
          this.service.isLoggedIn = true
          this.service.isAdmin = res.is_superuser ?? false;
          this.router.navigate(['home']);
        }
      });
    }
  }

}
