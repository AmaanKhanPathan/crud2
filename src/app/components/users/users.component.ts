import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/service/dialog.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _Dialog : MatDialog,
    private _empService : EmployeeService,
    private _snackbar : SnackBarService,
    private _dialogService : DialogService){}

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  ngOnInit(): void {
    this.getEmpList();
  }

  openAddEditEmpForm(){
    const dialogRef = this. _Dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmpList();
        }
      }
    })
  }


  // --------Get Call---------------
  getEmpList(){
    this._empService.getEmployee()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);        
      },
      error:(err)=>console.log
    })
  }

  // --------------Delete--------------
  deleteEmployee(id:number){
    // if(confirm('Are you sure to delete record?'))
    // this._empService.deleteEmployee(id).subscribe({
    //   next:(res)=>{
    //     this._snackbar.openSnackBar('Employee Deleted');
    //     this.getEmpList();
    //   },
    //   error:console.log       
    // })
    this._dialogService.openConfirmDialog('Are you sure to delete record?')
      .afterClosed().subscribe(res => {
        // console.log(res);
        if(res){
          this._empService.deleteEmployee(id).subscribe({
              next:(res)=>{
                this._snackbar.openSnackBar('Employee Deleted');
                this.getEmpList();
              },
              error:console.log       
            })
        }
        
      })
  }


  // -----------Open Edit Form--------------------
  openEditForm(data:any){
    const dialogRef = this._Dialog.open(EmpAddEditComponent, {
      data:data
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmpList()
        }
      }
    })
  }
}
 

