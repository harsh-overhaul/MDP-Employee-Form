import { Router } from '@angular/router';
import { ApiService } from './../../service/depapi.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css'],
})

export class DepartmentCreateComponent implements OnInit {
  submitted = false;
  departmentForm: FormGroup;
  DepartmentProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() {}

  mainForm() {
    this.departmentForm = this.fb.group({
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
  departmentupdateProfile(e) {
    this.departmentForm.get('designation').setValue(e, {
      onlySelf: true,
    });
  }

  // Getter to access form control
  get myForm() {
    return this.departmentForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.departmentForm.valid) {
      return false;
    } else {
      return this.apiService.createDepartment(this.departmentForm.value).subscribe({
        complete: () => {
          console.log('Department successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/department-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
