import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notification-delete',
  templateUrl: './notification-delete.component.html',
  styleUrls: ['./notification-delete.component.scss']
})
export class NotificationDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: number, name: string},
    private serverHttp: UsersService,
  ) { }

  ngOnInit(): void {
  }

  deleteUserById = (id: number) => {
    this.serverHttp.deleteUser(id).subscribe((data) => {
      location.reload();
    });
  }

}
