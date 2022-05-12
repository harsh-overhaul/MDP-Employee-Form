import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/depapi.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})

export class DepartmentListComponent implements OnInit {
  Department: any = [];

  constructor(private apiService: ApiService) {
    this.readDepartment();
  }

  ngOnInit() {}

  readDepartment() {
    this.apiService.getDepartments().subscribe((data) => {
      this.Department = data;
    });
  }

  removeDepartment(department, index) {
    if (window.confirm('Are you sure? you will remove '+index+department._id)) {
      this.apiService.deleteDepartment(department._id).subscribe((data) => {
        this.Department.splice(index,1);
      });
    }
  }
}
