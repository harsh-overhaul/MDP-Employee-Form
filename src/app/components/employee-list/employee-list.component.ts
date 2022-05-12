import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})

export class EmployeeListComponent implements OnInit {
  Employee: any = [];

  constructor(private apiService: ApiService) {
    this.readEmployee();
  }

  ngOnInit() {}

  readEmployee() {
    this.apiService.getEmployees().subscribe((data) => {
      this.Employee = data;
    });
  }

  removeEmployee(employee, index) {
    if (window.confirm('Are you sure?you will remove '+index+employee._id)) {
      console.log(employee._id)
      this.apiService.deleteEmployee(employee._id).subscribe((data) => {
        this.Employee.splice(index,1);
      });
    }
  }
}
