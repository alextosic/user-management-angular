import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { UserModel } from '../user.model';
import { UserService } from '../user.service';
import { DeleteDialog } from '../../shared/delete-dialog/delete.dialog';

@Component({
  selector: 'cdp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../../shared/table-list.styles.scss', './user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  columns: Array<string> = ['email', 'firstName', 'lastName', 'role', 'actions'];
  userList: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>();

  total: number = 0;
  page: number = 0;
  perPage: number = 5;

  constructor(private userService: UserService, private deleteDialog: MatDialog) {}

  ngOnInit() {
    this.userService.getUserList(this.page, this.perPage).subscribe();

    this.userService.userListUpdated$.subscribe((userList) => {
      this.userList = new MatTableDataSource<UserModel>(userList);

      if (userList.length === 0 && this.page > 0) {
        this.page -= 1;
        this.userService.getUserList(this.page, this.perPage).subscribe();
      }
    });

    this.userService.userTotalUpdated$.subscribe((total) => {
      this.total = total;
    });
  }

  onPageEvent(pageEvent: PageEvent) {
    const { pageIndex, pageSize } = pageEvent;

    this.perPage = pageSize;
    this.page = pageIndex;

    this.userService.getUserList(pageIndex, pageSize).subscribe();
  }

  deleteUser(id: string, email: string) {
    const dialogRef = this.deleteDialog.open(DeleteDialog, {
      data: {
        model: 'user',
        field: 'email',
        value: email,
      },
    });

    dialogRef.afterClosed().subscribe((confirmDelete) => {
      if (confirmDelete) {
        this.userService.deleteUser(id).subscribe(() => {
          this.userService.getUserList(this.page, this.perPage).subscribe();
        });
      }
    });
  }
}
