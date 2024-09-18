import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  users = [
    {
      name: 'John',
      age: 40,
    },
    {
      name: 'Smith',
      age: 30,
    },
    {
      name: 'Alex',
      age: 42,
    },
    {
      name: 'David',
      age: 40,
    },
  ];

  constructor() {}
}
