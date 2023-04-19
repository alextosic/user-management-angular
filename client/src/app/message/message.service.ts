import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string) {
    this.snackBar.open(message, undefined, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: 'snackbar-warn',
    });
  }

  hide() {
    this.snackBar.dismiss();
  }
}
