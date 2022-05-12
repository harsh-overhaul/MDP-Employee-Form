import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';

import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})

export class EmployeeCreateComponent implements OnInit {
  submitted = false;
  dropdownlist=[]
  dropdownSettings:IDropdownSettings={};
  // arr : Array<any>=[];
  // Department: any = [];
  EmployeeProfile:Array<any> = [
    {name:'Finance', value:'Finance'},
    { name:'BDM', value:'BDM'},
    { name:'HR', value:"HR"},
    {name:'Sales',value:'Sales'},
    {name:'Admin',value:'Admin'}];

  employeeForm: FormGroup;
  
  

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() {

    this.dropdownlist=this.EmployeeProfile;

    this.dropdownSettings={
      idField:"name",
      textField:"value"
    };
  }


  // readDepartment() {
  //   this.apiService.getDepartments().subscribe((data) => {
  //     this.Department = this.Department.data;
  //     for(var item  in data){
  //     this.arr.push({name:data[parseInt(item)]['designation'],value:data[parseInt(item)]['designation']})
  //     }
  //     console.log(this.arr)
  //   });
  // }

  mainForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  // Choose designation with select dropdown
  updateProfile(e) {
    this.employeeForm.get('designation').setValue(e, {
      onlySelf: true,
    });
  }

  // Getter to access form control
  get myForm() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.employeeForm.valid) {
      return false;
    } else {
      return this.apiService.createEmployee(this.employeeForm.value).subscribe({
        complete: () => {
          console.log('Employee successfully created!'),
            // this.readDepartment(),
            this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
