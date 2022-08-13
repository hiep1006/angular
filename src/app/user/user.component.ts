import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/User';
import { UsersService } from '../services/user.service';
import { DialogCreateComponent } from './dialog-create/dialog-create.component';
import { NotificationDeleteComponent } from './notification-delete/notification-delete.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private serverHttp: UsersService, public dialog: MatDialog,) { }
  public users: User[] = [];


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogCreateComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: "Add"
      },
    });
  }


  openDialogEdit(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
    this.dialog.open(DialogCreateComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: "Edit",
        id: id
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

  ngOnInit(): void {
    this.loadData();
  }


  loadData = () => {
    this.serverHttp.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  displayedColumns: string[] = ['fullname', 'username', 'department', 'weight'];
}
