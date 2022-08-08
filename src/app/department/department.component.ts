import { Component, OnInit } from '@angular/core';
import { Department } from '../models/Department';
import { DepartmentsService } from '../services/departments.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog, PopUpComponent } from '../pop-up/pop-up.component';

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
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  loadData = () => {
    this.serverHttp.getDepartments().subscribe((data) => {
      this.departments = data;
      console.log(this.departments);
    });
  }
  displayedColumns: string[] = ['id', 'name'];
}
