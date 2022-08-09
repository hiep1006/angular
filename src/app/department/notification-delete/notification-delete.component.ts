import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentsService } from 'src/app/services/departments.service';
import { DepartmentComponent } from '../department.component';

@Component({
  selector: 'app-notification-delete',
  templateUrl: './notification-delete.component.html',
  styleUrls: ['./notification-delete.component.scss']
})
export class NotificationDeleteComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: number, name: string},
    private serverHttp: DepartmentsService,
  ) { }

  ngOnInit(): void {
  }

  // loadData = () => {
  //   this.serverHttp.getDepartments().subscribe((data) => {
  //     this.departments = data;
  //   });
  // }

  deleteDepartmentById = (id: number) => {
    this.serverHttp.deleteDepartment(id).subscribe((data) => {
      location.reload();
    });
  }
}
