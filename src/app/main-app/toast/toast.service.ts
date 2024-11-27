import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastComponent} from "./toast.component";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  ///
  /// DI
  ///

  private readonly snackBar = inject(MatSnackBar);

  /// 
  /// UI Handlers
  ///

  public showToast(displayMessage: string, messageType: 'error' | 'warning' | 'info') {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        message: displayMessage,
        type: messageType
      },
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: messageType
    });
  }
}
