import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.scss']
})
export class MatConfirmDialogComponent implements OnInit {

  constructor(
    public _dialogRef : MatDialogRef<MatConfirmDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
   
  }

  closeDialog(){
    this._dialogRef.close(false)
  }

}
