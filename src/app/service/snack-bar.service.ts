import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackbar : MatSnackBar) { }

  openSnackBar(message : string, actions : string = 'Done!') {
    this._snackbar.open(message, actions, {
      duration: 2000,
      verticalPosition : 'top',
      horizontalPosition : 'center'
    });
  }
}
