import { Component, inject, TemplateRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsModel } from '../models/StudentsModel';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ClassService } from '../class.service';
import { ClassModel } from '../models/ClassModel.js';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';



import { Router } from '@angular/router';
import { Conditional } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  Students: StudentsModel[] = [
    { id: 1, profile: 'https://img.freepik.com/free-vector/girl-reading-book_1308-28563.jpg?size=626&ext=jpg&ga=GA1.1.21032866.1707135582&semt=ais', name: 'White john', class: 'KG', year: '2021', type: 'KGs', editMode: false },
    { id: 2, profile: 'https://img.freepik.com/free-vector/smart-boy-reading-book_1308-146055.jpg?size=626&ext=jpg&ga=GA1.1.21032866.1707135582&semt=ais', name: 'Wilson', class: 'LKG', year: '2021', type: 'KGs', editMode: false },
    { id: 3, profile: 'https://img.freepik.com/free-vector/one-happy-girl-uniform_1308-68638.jpg?size=626&ext=jpg&ga=GA1.1.21032866.1707135582&semt=ais', name: 'Miller', class: 'UKG', year: '2021', type: 'KGs', editMode: false },
    { id: 4, profile: 'https://img.freepik.com/free-vector/cute-boy-with-green-backpack-greeting_1308-38894.jpg?size=626&ext=jpg&ga=GA1.1.21032866.1707135582&semt=ais', name: 'Smith', class: '1', year: '2021', type: 'Primary', editMode: false },
    { id: 5, profile: 'https://img.freepik.com/free-vector/one-happy-girl-uniform_1308-68638.jpg?size=626&ext=jpg&ga=GA1.1.21032866.1707135582&semt=ais', name: 'Johnson', class: ' 2', year: '2021', type: 'Primary', editMode: false },
    { id: 6, profile: 'https://img.freepik.com/free-vector/student-boy-waving-hand-cartoon-character_1308-78613.jpg?size=626&ext=jpg&ga=GA1.1.21032866.1707135582&semt=ais', name: 'Mr. Davis', class: '3', year: '2022', type: 'Primary', editMode: false },
    { id: 7, profile: 'https://img.freepik.com/free-vector/cute-girl-character_1308-27723.jpg?size=626&ext=jpg&ga=GA1.1.21032866.1707135582&semt=ais', name: 'White', class: '4', year: '2022', type: 'Primary', editMode: false },
    { id: 8, profile: 'https://img.freepik.com/free-vector/girl-reading-book_1308-28563.jpg?size=626&ext=jpg&ga=GA1.1.21032866.1707135582&semt=ais', name: 'White john', class: '4', year: '2023', type: 'Primary', editMode: false },
    { id: 9, profile: 'https://img.freepik.com/free-vector/smart-boy-reading-book_1308-146055.jpg?size=626&ext=jpg&ga=GA1.1.21032866.1707135582&semt=ais', name: 'Wilson', class: '6', year: '2024', type: 'Secondary', editMode: false },
    { id: 10, profile: 'https://img.freepik.com/free-vector/one-happy-girl-uniform_1308-68638.jpg?size=626&ext=jpg&ga=GA1.1.21032866.1707135582&semt=ais', name: 'Miller', class: '7', year: '2021', type: 'Secondary', editMode: false },
    { id: 11, profile: 'https://img.freepik.com/free-vector/student-boy-waving-hand-cartoon-character_1308-78613.jpg?size=626&ext=jpg&ga=GA1.1.21032866.1707135582&semt=ais', name: 'Turner', class: '8', year: '2024', type: 'Secondary', editMode: false },
    { id: 12, profile: 'https://img.freepik.com/free-vector/girl-reading-book_1308-28563.jpg?size=626&ext=jpg&ga=GA1.1.21032866.1707135582&semt=ais', name: 'Moore', class: '9', year: '2021', type: 'Secondary', editMode: false },
    { id: 13, profile: 'https://img.freepik.com/free-vector/smart-boy-reading-book_1308-146055.jpg?size=626&ext=jpg&ga=GA1.1.21032866.1707135582&semt=ais', name: 'Clark', class: '10', year: '2021', type: 'Secondary', editMode: false }

    // ... other class objects
  ];
  classList: string[] = ['KG', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  years: number[] = [2021, 2022, 2023, 2024];
  classTypes: string[] = ['KGs', 'Primary', 'Secondary'];
  isClassListDisabled = true
  filteredClasses: ClassModel[] = [];

  filteredClasses$: Observable<StudentsModel[]> = of(this.Students);

  filteredStudent: any[] = [];

  editForm!: FormGroup;
  primarySecondaryFilterControl = new FormControl("All");
  yearFilterControl = new FormControl("All");
  classFilterControl = new FormControl("All");
  studentForm!: FormGroup;
  studentDetail: any

  constructor(private fb: FormBuilder, private classService: ClassService, private router: Router) {
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      class: ['', Validators.required],
    });
    this.studentForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      profile: 'https://img.freepik.com/free-vector/girl-reading-book_1308-28563.jpg?size=626&ext=jpg&ga=GA1.1.21032866.1707135582&semt=ais',
      class: ['', Validators.required],
      year: ['', Validators.required],
      type: ['', Validators.required],
    })
  }



  private modalService = inject(NgbModal);
  closeResult = '';

  // @Output() studentAdded = new EventEmitter<any>();

  open(content: TemplateRef<any>, detail?: any) {
    this.studentDetail = detail;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );


  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }


  ngOnInit(): void {
    this.applyFilters(); // Apply initial filters when component initializes
    // Listen for changes in filters and reapply filtering
    this.primarySecondaryFilterControl.valueChanges.subscribe(() => this.applyFilters());
    this.yearFilterControl.valueChanges.subscribe(() => this.applyFilters());
    this.classFilterControl.valueChanges.subscribe(() => this.applyFilters());
    this.filteredStudent = this.Students;

  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      // this.studentAdded.emit(this.studentForm.value);
      this.studentForm.reset();
    }
  }


  applyFilters(): void {
    this.filteredStudent = this.Students;
    let primarySecondaryFilterValue = this.primarySecondaryFilterControl.value;
    let yearFilterValue = this.yearFilterControl.value;
    let classFilterValue = this.classFilterControl.value;
    console.log(primarySecondaryFilterValue, yearFilterValue, classFilterValue);
    if (this.primarySecondaryFilterControl.value == 'All') {
      this.filteredStudent = this.Students;
    } else {
      this.filteredStudent = this.filteredStudent.filter((res: any) => {
        return res.class == this.classFilterControl.value && res.year == this.yearFilterControl.value;
      })
    }
  }
  applyYearFilters() {

  }
  applyFiltersForPrimary() {
    this.filteredStudent = this.Students;
    if (this.primarySecondaryFilterControl.value == 'All') {
      this.classList = ['KG', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      this.filteredStudent = this.Students;
      this.yearFilterControl.setValue("All")
      this.classFilterControl.setValue("All")
    } else if (this.primarySecondaryFilterControl.value == 'KGs') {
      this.isClassListDisabled = false;
      this.classList = ['KG', 'LKG', 'UKG'];
    } else if (this.primarySecondaryFilterControl.value == 'Primary') {
      this.isClassListDisabled = false;
      this.classList = ['1', '2', '3', '4', '5'];
    } else if (this.primarySecondaryFilterControl.value == 'Secondary') {
      this.isClassListDisabled = false;
      this.classList = ['6', '7', '8', '9', '10'];
    }
  }
  startEditing(item: any) {
    this.editForm.patchValue(item);
  }

  saveChanges() {
    const editedItemIndex = this.Students.findIndex(item => item.id === this.editForm.value.id);
    if (editedItemIndex !== -1) {
      this.Students[editedItemIndex] = this.editForm.value;
      this.editForm.reset();
    }
  }



  toggleEditMode(selectedClass: any): void {
    // Toggle the edit mode for the selected class
    selectedClass.editMode = selectedClass === selectedClass ? !selectedClass.editMode : false;
  }

  updateValue(updatedClass: StudentsModel): void {
    // Handle the update logic here

    // You can add your update logic (e.g., calling a service to update the backend)
    // Reset editMode after updating
    updatedClass.editMode = false;
  }

  deleteClass(selectedClass: StudentsModel): void {
    const index = this.filteredStudent.indexOf(selectedClass);
    if (index !== -1) {
      this.filteredStudent.splice(index, 1);
      console.log(`Deleted class with ID ${selectedClass.id}`);
      this.applyFilters();
    }
  }

  onFileChange(event: any, students: StudentsModel): void {
    const file = event.target.files[0];
    const fileInput = event.target;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Set the newProfile property with the base64 encoded image data
        students.profile = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      fileInput.blur(); // Remove focus from the file input to prevent reopening
    }
  }


  logout() {
    sessionStorage.clear();
    this.router.navigate(['/'])
  }
  onSubmitStudent() {
    var newId = this.filteredStudent.length + 1;
    this.studentForm.patchValue({
      id: newId
    })
    this.filteredStudent.push(this.studentForm.value)
    this.studentForm.reset()
  }
}
