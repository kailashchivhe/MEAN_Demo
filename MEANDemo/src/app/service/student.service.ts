import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from '../models/Student.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  form = new FormGroup({
    _id: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    address: new FormControl('', Validators.required )
  });
  private isUpdate = false;
  constructor( private httpclient: HttpClient ) { }

  populateForm(student: Student) 
  {
    console.log( "populate");
    this.form.setValue(student);
    this.isUpdate = true;
  }

  insert( student: Student )
  {
    if( this.isUpdate )
    {
      console.log("updating");
      return this.update( student );
    }
    else
    {
      return this.httpclient.get('http://localhost:3000/mongodb/insert',{
        params:{
          name: student.name,
          email: student.email,
          address: student.address
        }
      });
    }
  }

  delete( student: Student )
  {
    return this.httpclient.get('http://localhost:3000/mongodb/remove',{
      params:{
        name: student.name
      }
    });
  }

  update( student: Student )
  {
    this.isUpdate = false;
    console.log(student.name);
    // let paramvalues = new HttpParams({
    //   fromString:`name=${student.name}&email=${student.email}&address=${student.address}`
    // });
    return this.httpclient.get(`http://localhost:3000/mongodb/update?name=${student.name}&email=${student.email}&address=${student.address}`);
  }

  fetchAll(): Observable<Student[]>{
    return this.httpclient.get<Student[]>('http://localhost:3000/mongodb/fetch').pipe(
      map( res => res ),
      shareReplay()
    );
  }
}
