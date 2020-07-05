import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Observable } from 'rxjs';
import { Student } from '../models/Student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  student$: Observable<Student[]>;
  showDeletedMessage: boolean;

  constructor(private studentService:StudentService) { }

  ngOnInit() {
    this.student$ = this.studentService.fetchAll();
  }

  onDelete( student: Student )
  {
    if( confirm('Are you sure you want to delete ?') ) 
    {
      this.studentService.delete( student );
      this.showDeletedMessage = true;
    }
  }
}
