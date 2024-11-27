import {Component} from '@angular/core';
import {tokenGetter} from "./app.module";

@Component({
  selector: 'app-root',
  template: `
    <app-nav-bar *ngIf="tokenGetter()"></app-nav-bar>
    <router-outlet></router-outlet>
    <app-footer *ngIf="tokenGetter()"></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'Cognitive Load App';

  public tokenGetter() {
    return !!tokenGetter();
  }
}
