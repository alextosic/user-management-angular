import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { UserModel } from '../user.model';
import { UserService } from '../user.service';
import { UserDeleteDialog } from '../user-delete.dialog';

@Component({
  selector: 'cdp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  columns: Array<string> = ['email', 'firstName', 'lastName', 'actions'];
  userList: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>();

  total: number = 0;
  page: number = 0;
  perPage: number = 10;

  constructor(private userService: UserService, private deleteDialog: MatDialog) {}

  ngOnInit() {
    this.userService.getUserList(this.page, this.perPage).subscribe();

    this.userService.userListUpdated$.subscribe((userList) => {
      this.userList = new MatTableDataSource<UserModel>(userList);
    });

    this.userService.userTotalUpdated$.subscribe((total) => {
      this.total = total;
    });
  }

  onPageEvent(pageEvent: PageEvent) {
    const { pageIndex, pageSize } = pageEvent;
    this.userService.getUserList(pageIndex, pageSize).subscribe();
  }

  deleteUser(id: string, email: string) {
    const dialogRef = this.deleteDialog.open(UserDeleteDialog, {
      data: {
        email,
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
