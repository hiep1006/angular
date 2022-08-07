import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyApp';
  constructor(
    private dialogRef: MatDialog
  ) { }
  openDialog(){
    this.dialogRef.open(PopUpComponent, {
      data: {
        name: 'samuel'
      }
    });
  }
}
