import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee, Title } from './Model/employee.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeServiceService } from './employee/employee-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular_18_crud';

  employeeForm!: FormGroup;

  employeeList: Employee[] = [];

  tampung: any;

  empIdCounter = 0;

  editingEmployeeIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      contactNo: ['', Validators.required],
      emailId: ['', [Validators.email, Validators.required]],
      pinCode: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  createForm() {
    const data: Employee = {
      ...this.employeeForm.value,
      empId:
        this.editingEmployeeIndex !== null
          ? this.employeeList[this.editingEmployeeIndex].empId
          : this.employeeList.length + 1,
    };
    if (this.employeeForm.valid) {
      if (this.editingEmployeeIndex !== null) {
        // jika sedang di edit
        this.employeeList[this.editingEmployeeIndex] = data;
        this.editingEmployeeIndex = null;
      } else {
        console.log('tidak di edit: ', this.editingEmployeeIndex);
        this.employeeList.push(data);
      }
      this.saveEmployees(); // Simpan data ke Local Storage
      this.employeeForm.reset(); // Reset form setelah submit
    }
  }

  saveEmployees(): void {
    localStorage.setItem('employees', JSON.stringify(this.employeeList));
  }

  loadEmployees(): void {
    if (localStorage.getItem('employees') !== null) {
      this.employeeList = JSON.parse(localStorage.getItem('employees')!);
    }
  }

  onEdit(item: Employee, index: number) {
    this.employeeForm.patchValue({
      name: item.name,
      emailId: item.emailId,
      city: item.city,
      address: item.address,
      contactNo: item.contactNo,
      pinCode: item.pinCode,
      state: item.state,
    });
    this.editingEmployeeIndex = index;
  }

  onDelete(i: number) {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      this.employeeList = this.employeeList.filter(
        (item, index) => i !== index
      );
      this.saveEmployees();
      alert('Item berhasil dihapus!'); // Pemberitahuan kepada pengguna
    }
  }

  clearStorage() {
    localStorage.removeItem('employees');
    this.employeeList = [];
  }
}
