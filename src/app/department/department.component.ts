import { Component, OnInit } from '@angular/core';
import { Department } from '../models/Department';
import { DepartmentsService } from '../services/departments.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { NotificationDeleteComponent } from './notification-delete/notification-delete.component';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  public departments: Department[] = [
  ];

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
    });
  }

  openNotificationDelete(enterAnimationDuration: string, exitAnimationDuration: string, id: number, name: string): void {
    this.dialog.open(NotificationDeleteComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id: id, name: name },
      
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

  ngOnInit(): void {
    this.loadData();
  }

  loadData = () => {
    this.serverHttp.getDepartments().subscribe((data) => {
      this.departments = data;
    });
  }
  displayedColumns: string[] = ['id', 'name', 'weight'];
}
