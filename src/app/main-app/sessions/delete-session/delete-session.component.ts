import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SessionsService} from "../../../services/sessions.service";

@Component({
  selector: 'app-delete-session',
  template: `
    <div class="p-5">
      <h1 class="flex w-full justify-center text-black">Delete session</h1>
      <hr/>
      <div class="flex justify-center text-black text-lg my-3">
       Are you sure to delete the session?
      </div>
      <div class="flex justify-center mt-5 gap-x-3">
        <button mat-button class="text-black !bg-gray-200 hover:!bg-gray-300 w-28 h-9 !border !rounded-lg" (click)="cancel()">Cancel</button>
        <button mat-raised-button (click)="deleteSession()" class="!bg-blue-700 !text-white hover:!bg-blue-800 border-solid w-28 h-9 !border !rounded-lg">Delete</button>
      </div>
    </div>
  `,
})
export class DeleteSessionComponent {

  ///
  /// DI
  ///

  private readonly service = inject(SessionsService);

  constructor(private dialogRef: MatDialogRef<DeleteSessionComponent>, @Inject(MAT_DIALOG_DATA) data: any,) {
    if (data.id) {
      this.id = data.id
    }
  }

  ///
  /// View Model
  ///

  protected id: string = ''

  /// 
  /// UI Handlers
  ///

  protected deleteSession() {
    this.service.deleteSession(this.id).subscribe(() => {
      this.dialogRef.close(true);
    })
  }

  protected cancel() {
    this.dialogRef.close(false);
  }

}
