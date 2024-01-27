import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/service/employee.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

  empForm !: FormGroup;

  education : string[] = [
    "Select Education",
    "Matric",
    "Diploma",
    "Graduation",
    "Post-Graduation"
  ]

  constructor(
    private _fb : FormBuilder,
    private _empService : EmployeeService,
    private _snackbar : SnackBarService,
    private _dialog : MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    ) {
    this.empForm = this._fb.group({
      firstName : '',
      lastName : '',
      email : '',
      dob : '',
      gender : '',
      education : '',
      company : '',
      experience : '',
      package : ''
    })
   }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    // console.log(this.data);
    
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next:(val)=>{
            this._snackbar.openSnackBar('Employee Updated!');
            this._dialog.close(true);
          }, 
          error:(err)=>{
            console.log(err);            
          }
        })
      }else{
      this._empService.addEmployee(this.empForm.value)
      .subscribe({
        next : (val:any)=>{
          this._snackbar.openSnackBar('Employee Added Successfully');
          this._dialog.close(true)
        },
        error : (err:any)=>{
          console.log(err);
          
        }
      })
    }
      // console.log(this.empForm.value);
      
    }
  }

}
