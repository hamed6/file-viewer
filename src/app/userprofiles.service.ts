import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
// import { error } from 'util';

import { userModel } from '../../backend/models/userProfile.js';



@Injectable({
  providedIn: 'root'
})

export class UserprofilesService {

  // uri='94.237.93.109';




  constructor(private http: HttpClient) { }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  // RETURN ALL USER INFORMATION RELATED TO THE GIVEN IMO
  getUserImo(imo) {
    // return (this.http.get(`http://94.237.93.109:8080/api/userslist/${imo}`));
    return (this.http.get(`/api/userslist/${imo}`));
  }


  // RETURN ALL DOCUMENT RELATED TO THE GIVE IMO
  getDocumentImo(imo) {
    return(this.http.get(`/api/document/${imo}`));
    // return (this.http.get(`http://94.237.93.109:8080/api/document/${imo}`));
  }

  // TO LOG IN USER
  loginUser(value) {
    this.setUserInfo(value.imo);

    return this.http.post(`/login`, value);    
    return this.http.post(`http://94.237.93.109:8080/login`, value);
  }

  // TO SET THE SAVED IMO IN SERVICE
  setUserInfo(imo: any) {
    localStorage.setItem('sharedImo', imo);
  }

  // TO GET THE SAVED IMO IN SERVICE
  getUserInfo() {
    let data = localStorage.getItem('sharedImo');
    return (JSON.parse(data));
  }

  // TO CLEAR ALL LOCAL STORAGE
  cleanAll() {
    localStorage.clear();
  };


  // TO EXRACT ALL USERS INFORMATION 
  getUsername(value: any) {
    localStorage.setItem('sharedUN', value.sharedUN);
  }

  setUsername() {
    let data = localStorage.getItem('sharedUN');
    return (JSON.parse(data));
  }

  // TO REGISTER USER 
  registerUser(value) {
    // return this.http.post(`/register`,value);
    return null;
  }

  usermanual() {
    return this.http.get(`/manual`);
  }
  // --------------------------------------------------- TESTING
  // TO TEST OBSERVABLE  
  funcObser(imo): Observable<userModel[]> {
    return this.http
      .get<userModel[]>(`http://94.237.93.109:8080/api/userslist/${imo}`)
      .pipe(catchError(this.handleError('funcObservable', [])));
  }

}