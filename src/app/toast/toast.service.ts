import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastComponent} from "./toast.component";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) {
  }

  showToast(displayMessage: string, messageType: 'error' | 'warning' | 'info', logged:boolean = false) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        message: displayMessage,
        type: messageType
      },
      duration: 3000,
      horizontalPosition: logged? "right" : "center",
      verticalPosition: "top",
      panelClass: messageType
    });
  }
}
