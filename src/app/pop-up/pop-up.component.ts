import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddDepartment } from '../models/AddDepartment';
import { DepartmentsService } from '../services/departments.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {
  public name = "";
  public errorName = "";
  public contractTypeValid = false;

  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    private serverHttp: DepartmentsService,
  ) { }
  objData: AddDepartment = {
    name: ""
  };

  addDepartment = () => {
    this.contractTypeValid = true;
    this.objData.name = this.name;
    if(this.name == "" || this.name == null){
      this.errorName = "không thể trống!";
      this.contractTypeValid = false;
      return;
    }
    
    this.serverHttp.addDepartment(this.objData).subscribe((data) => {
      location.reload();
      this.contractTypeValid = false;
    });

   
  }


}
