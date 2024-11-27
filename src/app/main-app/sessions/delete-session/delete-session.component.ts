import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SessionsService} from "../../../services/sessions.service";

@Component({
  selector: 'app-delete-session',
  template: `
    <div class="container">
      <h1 mat-dialog-title class="delete-user-dialog-title">Delete session</h1>
      <div class="dialog-content">
       Are you sure to delete the session?
      </div>
      <div mat-dialog-actions>
        <button mat-button mat-dialog-close="true" class="cancel-button" (click)="cancel()">Cancel</button>
        <button mat-raised-button (click)="deleteSession()" class="delete-user-button">Delete</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    
    .delete-user-dialog-title {
      color: #294166;
      display: flex;
      justify-content: center;
    }
    
    .mat-dialog-title {
      border-bottom: 2px solid #FFA6AD
    }
    
    .delete-user-button {
      background-color: #294166;
      border-radius: 5px;
      color: #FFFFFF;
      width: 125px;
    }
    
    .cancel-button {
      color: #294166;
    }
    
    .dialog-content {
      color: #3E5F8D;
      justify-content: center;
      display: flex;
      margin-bottom: 10px;
    }
  `]
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
