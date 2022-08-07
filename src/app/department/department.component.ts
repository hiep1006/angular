import { Component, OnInit } from '@angular/core';
import { Department } from '../models/Department';
import { DepartmentsService } from '../services/departments.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

export interface PeriodicElement {
  id: number;
  name: string;
}

var ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Hydrogen' },
  { id: 2, name: 'Helium' },
  { id: 3, name: 'Lithium' },
  { id: 4, name: 'Beryllium' },
  { id: 5, name: 'Boron' },
  { id: 6, name: 'Carbon' },
  { id: 7, name: 'Nitrogen' },
  { id: 8, name: 'Oxygen' },
  { id: 9, name: 'Fluorine' },
  { id: 10, name: 'Neon' }
];

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  public departments: Department[] = [];

  constructor(
    private serverHttp: DepartmentsService,
    private dialogRef: MatDialog
  ) {
  }

 ngOnInit(): void {
    this.loadData();
  }

  openDialog() {
    this.dialogRef.open(PopUpComponent, {
      data: {
        name: 'samuel'
      }
    });
  }

  loadData = async () => {
    await this.serverHttp.getDepartments().subscribe((data) => {
      ELEMENT_DATA = data;
      console.log(ELEMENT_DATA);
    });
  }


  displayedColumns: string[] = ['id', 'name'];
  dataSource = ELEMENT_DATA;
}
