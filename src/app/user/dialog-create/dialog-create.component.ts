import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUser } from 'src/app/models/AddUser';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.scss']
})
export class DialogCreateComponent implements OnInit {
  public fullname = "";
  public username = "";
  public department = "";
  public contractTypeValid = false;
  private id = -1;

  objData: AddUser = {
    fullname: "",
    username: "",
    department: ""
  };

  editData: User = {
    id: -1,
    fullname: "",
    username: "",
    department: ""
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string },
    private serverHttp: UsersService,
  ) { }

  ngOnInit(): void {
  }

  save = (id: number = -1) => {
    this.id = id;
    if (id === -1) {
      this.addUser();
    } else {
      this.editUser();
    }
  }

  addUser = () => {
    this.contractTypeValid = true;
    this.objData.fullname = this.fullname;
    this.objData.username = this.username;
    this.objData.department = this.department;
    // if(this.name == "" || this.name == null){
    //   this.errorName = "không thể trống!";
    //   this.contractTypeValid = false;
    //   return;
    // }

    this.serverHttp.addUser(this.objData).subscribe((data) => {
      location.reload();
      this.contractTypeValid = false;
    });
  }

  editUser = () => {
    this.contractTypeValid = true;
    this.editData.id = this.id;
    this.editData.fullname = this.fullname;
    this.editData.username = this.username;
    this.editData.department = this.department;
    this.serverHttp.modifyUser(this.id, this.editData).subscribe((data) => {
      location.reload();
      this.contractTypeValid = false;
    });
  }

}
