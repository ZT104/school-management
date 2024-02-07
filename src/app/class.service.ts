import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClassModel } from './models/ClassModel.js';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private classes:ClassModel [] = [
    { "id": 1, "class": 1, "type": "primary", "editMode": false },
    { "id": 2, "class": 2, "type": "primary", "editMode": false },
    { "id": 3, "class": 3, "type": "primary", "editMode": false },
    { "id": 4, "class": 4, "type": "primary", "editMode": false },
    { "id": 5, "class": 5, "type": "primary", "editMode": false },
    { "id": 6, "class": 6, "type": "secondary", "editMode": false },
    { "id": 7, "class": 7, "type": "secondary", "editMode": false },
    { "id": 8, "class": 8, "type": "secondary", "editMode": false },
    { "id": 9, "class": 9, "type": "secondary", "editMode": false },
    { "id": 10, "class": 10, "type": "secondary", "editMode": false },
    { "id": 11, "class": 11, "type": "secondary", "editMode": false },
    { "id": 12, "class": 12, "type": "secondary", "editMode": false }
  ];

  constructor() {}

  // Method to get all classes
  getClasses(): Observable<ClassModel[]> {
    // Simulate an asynchronous operation (e.g., fetching data from a server)
    return of(this.classes);
  }

  // Method to add a new class
  addClass(newClass: ClassModel): Observable<ClassModel[]> {
    // Simulate an asynchronous operation to add a new class
    this.classes.push(newClass);
    return of(this.classes);
  }

  // Method to update a class
  updateClass(updatedClass: ClassModel): Observable<ClassModel[]> {
    // Simulate an asynchronous operation to update the class
    const index = this.classes.findIndex(c => c.id === updatedClass.id);
    if (index !== -1) {
      this.classes[index] = updatedClass;
    }
    return of(this.classes);
  }

  // Method to delete a class
  deleteClass(id: number): Observable<ClassModel[]> {
    // Simulate an asynchronous operation to delete the class
    this.classes = this.classes.filter(c => c.id !== id);
    return of(this.classes);
  }
}
