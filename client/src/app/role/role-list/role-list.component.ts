import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { RoleModel } from '../role.model';
import { RoleService } from '../role.service';
import { PageEvent } from '@angular/material/paginator';
import { DeleteDialog } from '../../shared/delete-dialog/delete.dialog';

@Component({
  selector: 'cdp-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['../../shared/table-list.styles.scss', './role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
  columns: Array<string> = ['name', 'permissions', 'actions'];
  roleList: MatTableDataSource<RoleModel> = new MatTableDataSource<RoleModel>();

  total: number = 0;
  page: number = 0;
  perPage: number = 10;

  constructor(private roleService: RoleService, private deleteDialog: MatDialog) {}

  ngOnInit() {
    this.roleService.getRoleList(this.page, this.perPage).subscribe();

    this.roleService.roleListUpdated$.subscribe((roleList) => {
      this.roleList = new MatTableDataSource<RoleModel>(roleList);
    });

    this.roleService.roleTotalUpdated$.subscribe((total) => {
      this.total = total;
    });
  }

  onPageEvent(pageEvent: PageEvent) {
    const { pageIndex, pageSize } = pageEvent;
    this.roleService.getRoleList(pageIndex, pageSize).subscribe();
  }

  deleteRole(id: string, name: string) {
    const dialogRef = this.deleteDialog.open(DeleteDialog, {
      data: {
        model: 'role',
        field: 'name',
        value: name,
      },
    });

    dialogRef.afterClosed().subscribe((confirmDelete) => {
      if (confirmDelete) {
        this.roleService.deleteRole(id).subscribe(() => {
          this.roleService.getRoleList(this.page, this.perPage).subscribe();
        });
      }
    });
  }
}
