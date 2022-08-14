import { Component, Inject, OnInit } from '@angular/core';
import { Department } from '../models/Department';
import { DepartmentsService } from '../services/departments.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { NotificationDeleteComponent } from './notification-delete/notification-delete.component';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  public departments: Department[] = [
  ];
  public total = 0;
  public search = "";

  constructor(
    private serverHttp: DepartmentsService,
    public dialog: MatDialog,
  ) {

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PopUpComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: "Add"
      },
    });
  }

  openNotificationDelete(enterAnimationDuration: string, exitAnimationDuration: string, id: number, name: string): void {
    this.dialog.open(NotificationDeleteComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        name: name,
        id: id
      },

    });
  }

  openNotificationEdit(enterAnimationDuration: string, exitAnimationDuration: string, name: string, id: number): void {
    this.dialog.open(PopUpComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id, title: "Edit"
      },
    });
  }



  ngOnInit() {
    this.loadData();
  }

  totalDepartment = () => {
    for (let index = 0; index < this.departments.length; index++) {
      this.total = this.total + 1;
    }
  }

  dataSource = new MatTableDataSource(this.departments);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadData = () => {
    this.serverHttp.getDepartments().subscribe((data) => {
      this.departments = data;
      this.totalDepartment();
    });

  }
  displayedColumns: string[] = ['id', 'name', 'weight'];
}
