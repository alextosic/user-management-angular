import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cdp-delete-dialog',
  templateUrl: './delete.dialog.html',
  styleUrls: ['./delete.dialog.scss'],
})
export class DeleteDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { model: string, field: string, value: string },
  ) {}
}
