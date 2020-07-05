import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Student } from '../models/Student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  showSuccessMessage: boolean;
  formControls = this.studentService.form.controls;
  constructor(private studentService:StudentService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("submitted");
    if (this.studentService.form.valid) 
    {
      this.studentService.insert(this.studentService.form.value);
    }
  }
}
