import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddDepartment } from '../models/AddDepartment';
import { Department } from '../models/Department';
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
  private id = -1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {title: string, id: number},
    public dialogRef: MatDialogRef<PopUpComponent>,
    private serverHttp: DepartmentsService,
  ) { }
  objData: AddDepartment = {
    name: ""
  };

  editObj: Department = {
    id: -1,
    name: ""
  };

  save = (id: number = -1) => {
    this.id = id;
    if(id === -1){
      this.addDepartment();
    }else{
      this.editDepartment();
    }
  }

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
      this.dialogRef.close("IT WAS SAVED");
    });
  }

  editDepartment = () => {
    this.contractTypeValid = true;
    this.editObj.name = this.name;
    this.editObj.id = this.id;
    if(this.name == "" || this.name == null){
      this.errorName = "không thể trống!";
      this.contractTypeValid = false;
      return;
    }
    this.serverHttp.modifyDepartment(this.id, this.editObj).subscribe((data) => {
      location.reload();
      this.contractTypeValid = false;
      this.dialogRef.close("IT WAS SAVED");
    });
  }
}
