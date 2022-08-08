import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Department } from '../models/Department';
import { AddDepartment } from '../models/AddDepartment';

@Injectable({
  providedIn: 'root'
})

export class DepartmentsService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
      // Authorization: 'Basic ' + btoa('username:password'),
    }),
  };
  private REST_API_SERVER = 'https://627bc17ba01c46a85324bd9a.mockapi.io/api/v1/department';
  constructor(private httpClient: HttpClient) { }

  public getDepartments(): Observable<Department[]> {
    const url = `${this.REST_API_SERVER}`;
    return this.httpClient
      .get<Department[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getDepartment(studentId: number) {
    const url = `${this.REST_API_SERVER}/` + studentId;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getRandomDepartment() {
    const url = `https://randomuser.me/api/?results=1`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public addDepartment(data: AddDepartment) {
    const url = `${this.REST_API_SERVER}`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public modifyDepartment(studentId: number, data: Department) {
    const url = `${this.REST_API_SERVER}/students/` + studentId;
    return this.httpClient
      .put<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteDepartment(studentId: number) {
    const url = `${this.REST_API_SERVER}/` + studentId;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
  }

  public getProfile() {
    const url = `${this.REST_API_SERVER}/profile`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getComments() {
    const url = `${this.REST_API_SERVER}/comments`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getPosts() {
    const url = `${this.REST_API_SERVER}/posts`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public addPosts(data: string) {
    const url = `${this.REST_API_SERVER}/posts`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
