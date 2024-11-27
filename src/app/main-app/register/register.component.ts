import {Component, inject, OnInit} from '@angular/core';
import {UserCreation} from "../../services/login.service";
import {Router} from "@angular/router";
import {ToastService} from "../toast/toast.service";
import {RegisterService} from "../../services/register.service";

@Component({
  selector: 'app-register',
  template: `
    <div class="flex h-full w-full">
      <div class="flex w-3/5 bg-cover bg-no-repeat bg-center" style="background-image: url('../../../assets/cognitive.png')"></div>
      <div class="w-2/5">
        <div class="h-full w-full bg-gray-300 bg-opacity-50">
          <div class="text-center pt-20 pb-6">
            <p class="text-black font-bold text-xl">Welcome!</p>
          </div>
          <div class="text-center pb-10">
            <p class="text-black font-extrabold text-2xl">Create an account</p>
          </div>
          <div class="rounded-lg px-20">
            <form>
              <label class="block text-black text-lg font-medium mb-2" for="name">
                Name
              </label>
              <input type="text" id="name" name="name" autocomplete="name" [(ngModel)]="this.user.name" 
                class="w-full h-10 px-4 mb-4 border border-gray-300 rounded-xl text-lg" />
              <label class="block text-black text-lg font-medium mb-2" for="email">
                Email
              </label>
              <input type="text" id="email" name="email" autocomplete="email" [(ngModel)]="this.user.email" 
                class="w-full h-10 px-4 mb-4 border border-gray-300 rounded-xl text-lg" />
              <label class="block text-black text-lg font-medium mb-2" for="password">
                Password
              </label>
              <input type="password" id="password" name="password" autocomplete="off" [(ngModel)]="this.user.password" 
                class="w-full h-10 px-4 mb-6 border border-gray-300 rounded-xl text-lg" />
              <div class="flex justify-center">
                <button type="button" 
                  class="w-2/6 bg-blue-700 text-white text-lg font-semibold py-2 rounded-lg hover:bg-blue-900 disabled:bg-blue-400" 
                  (click)="register()" 
                  [disabled]="this.user.email == '' || this.user.password == '' || this.user.name == ''">
                  Continue
                </button>
              </div>
            </form>
          </div>
          <div class="flex justify-center mt-6">
            <p class="text-black text-lg font-medium">
              Have an account already? 
              <a href="/login" class="text-blue-600 underline hover:text-blue-800">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: []
})
export class RegisterComponent implements OnInit {

  ///
  /// DI
  ///

  private readonly router = inject(Router);
  private readonly service = inject(RegisterService);
  private readonly toast = inject(ToastService);

  ///
  /// View Model
  ///
 
  protected user: UserCreation = {name: '', email: '', password: ''}
  
  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    localStorage.clear();
  }

  /// 
  /// UI Handlers
  ///

  protected register(): void {
    if (this.user.email == '' || this.user.password == '' || this.user.name == '')
      this.toast.showToast('Incomplete fields', 'warning')
    else {
      this.service.register(this.user.name, this.user.email, this.user.password).subscribe(res => {
        this.router.navigate(['login']);
      });
    }
  }

}
