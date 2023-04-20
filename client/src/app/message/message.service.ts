import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

type SnackBarType = 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, type: SnackBarType) {
    this.snackBar.open(message, undefined, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: `snackbar-${type}`,
    });
  }

  hide() {
    this.snackBar.dismiss();
  }
}
