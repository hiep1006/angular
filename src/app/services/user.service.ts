import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/User';
import { AddUser } from '../models/AddUser';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
      // Authorization: 'Basic ' + btoa('username:password'),
    }),
  };
  private REST_API_SERVER = 'https://627bc17ba01c46a85324bd9a.mockapi.io/api/v1/user';
  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<User[]> {
    const url = `${this.REST_API_SERVER}`;
    return this.httpClient
      .get<User[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  
  public addUser(data: AddUser) {
    const url = `${this.REST_API_SERVER}`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public modifyUser(id: number, data: User) {
    const url = `${this.REST_API_SERVER}/` + id;
    return this.httpClient
      .put<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteUser(id: number) {
    const url = `${this.REST_API_SERVER}/` + id;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
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
