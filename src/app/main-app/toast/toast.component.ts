import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-toast',
  template: `
    <div class="container">
      <label *ngIf="data.type === 'info'">
        <mat-icon>check_circle_outline</mat-icon>
      </label>
      <label *ngIf="data.type === 'warning'">
        <mat-icon>report_problem</mat-icon>
      </label>
      <label *ngIf="data.type === 'error'">
        <mat-icon>report_problem</mat-icon>
      </label>
      <label class="message">
        {{data.message}}
      </label>
    </div>
  `,
  styles: [`
    .container {
      min-height: 100%;
      min-width: 100%;
      justify-content: center;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
    }
    
    .message {
      font-size: 1.2rem;
      height: 24px;
      font-weight: 700;
      align-content: center;
    }
    
    .mat-icon {
      height: 100%;
      width: 100%;
      padding-right: 10px;
      padding-top: 3px;
    }
    
    .material-icons {
      font-size: 16px;
    }
  `],
})
export class ToastComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              public snackBarRef: MatSnackBarRef<ToastComponent>) {
  }

}
