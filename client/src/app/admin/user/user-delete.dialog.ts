import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cdp-user-delete-dialog',
  templateUrl: './user-delete.dialog.html',
  styleUrls: ['./user-delete.dialog.scss'],
})
export class UserDeleteDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string }) {}
}
