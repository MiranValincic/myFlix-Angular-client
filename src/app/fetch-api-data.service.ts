import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = "https://miran-flix.herokuapp.com/";
@Injectable({
  providedIn: "root",
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
  //user Login endpoint
  public userLogin( userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  //Get All Movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Get one movie
  getMovieByName(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Get Director info
  getDirectorByName(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Get Genre info
  getGenreByName(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genre/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Get User's profile
  getUserProfile(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }
  //Get favorite movie list
  getFavoriteMovies(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }
  //Add a movite to user's favorites
  addFavoriteMovies(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${username}/favorites/${MovieID}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }
  //Edit user's profile info
  editUserProfile(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const Name = localStorage.getItem('user');
   
   
      return this.http.put(apiUrl + `users/${Name}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
   
  }
  //Remove user's profile
  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

    //Delete a movie from user's favorites
  deleteFavoriteMovies(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/favorites/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData),
      catchError(this.handleError));
    }
// Non-typed response extraction
private extractResponseData(res: any): any {
  const body = res;
  return body || { };
}

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something went wrong; please try again later.');
  }
}