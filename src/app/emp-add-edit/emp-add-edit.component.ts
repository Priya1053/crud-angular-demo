import { DialogRef } from '@angular/cdk/dialog';
import { createInjectableType } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscriber } from 'rxjs';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit{
  empForm:FormGroup;


education:string[]=[
  'B.E',
  'Diploma',
  'MSCIT',
  'BCA',
  'MCA'
];
  
constructor(
  private _fb:FormBuilder ,
  private _empservice:EmployeeService,
  private _dialogRef:MatDialogRef<EmpAddEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any

  )


{
  this.empForm=this._fb.group({
    Name:'',
    Email :'',
    password :'',
    DateofBirth :'',
    Gender :'',
    Qualification :'',
    Company :'',
    Experience :'',
    Package :''

  });
}

ngOnInit(): void {
  this.empForm.patchValue(this.data);
}

onFormSubmit(){
  if(this.empForm.valid){
    {
      if(this.data)
      {
        this._empservice.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next : (val:any) =>{
            alert("Employee updated ");
            this._dialogRef.close(true);
          },
          error:(err:any) =>{
            console.error(err);
          }
          
          
        })
      }else{
        this._empservice.addEmployee(this.empForm.value).subscribe({
          next : (val:any) =>{
            alert("Employee added successfully");
            this._dialogRef.close(true);
          },
          error:(err:any) =>{
            console.error(err);
          }
          
          
        })
      }
    }
   
  }
}
}

