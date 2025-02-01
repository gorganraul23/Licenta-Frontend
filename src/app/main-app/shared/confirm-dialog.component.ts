import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="p-5">
      <h1 class="flex w-full justify-center text-black">{{ this.titleText !== '' ? this.titleText : 'Confirm' }}</h1>
      <hr/>
      <div class="flex justify-center text-black text-lg my-3">
        {{ this.contentText !== '' ? this.contentText : 'Are you sure?' }}
      </div>
      <div class="flex justify-center mt-5 gap-x-3">
        <button mat-button class="flex items-center justify-center text-black !bg-gray-200 hover:!bg-gray-300 border rounded-lg w-28 h-9" (click)="cancel()">Cancel</button>
        <button mat-raised-button (click)="confirm()" class="flex items-center justify-center !bg-blue-700 !text-white hover:!bg-blue-800 border rounded-lg w-28 h-9">{{ this.confirmButtonText !== '' ? this.confirmButtonText : 'Yes' }}</button>
      </div>
    </div>
  `,
})
export class ConfirmDialogComponent {

  ///
  /// DI
  ///

  private readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) data: any,) {
    if (data.titleText) {
      this.titleText = data.titleText
    }
    if(data.contentText) {
      this.contentText = data.contentText
    }
    if(data.confirmButtonText) {
      this.confirmButtonText = data.confirmButtonText
    }
  }

  ///
  /// View Model
  ///

  protected titleText: string = ''
  protected contentText: string = ''
  protected confirmButtonText: string = ''

  /// 
  /// UI Handlers
  ///

  protected confirm() {
    this.dialogRef.close(true);
  }

  protected cancel() {
    this.dialogRef.close(false);
  }

}
