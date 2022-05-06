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
 /**
   * Inject the HttpClient module to the constructor params
  This will provide HttpClient to the entire class, making it available via this.http
   * @param http 
   */
  constructor(private http: HttpClient) {
  }
/**
 * call API endpoint to register a new user
 * @function userRegistration
 * @param userDetails 
 * @returns a new user object in JSON format
 */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
/**
 * calls API endpoint for user login
 * @function userLogin
 * @param userDetails 
 * @returns a users' data in JSON format
 */
  public userLogin( userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  /**
 * calls API endpoint to get all movies
 * @function getAllMovies
 * @returns an array of the movies object in JSON format
 */
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
  /**
 * calls API endpoint for getting a single movie 
 * @function getOneMovie
 * @param title 
 * @returns a movie object in JSON format
 */
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
  /**
 * calls the API endpoint to get director info by his*her name
 * @function getDirectorByName
 * @param name
 * @returns directors' data in JSON format
 */
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
  /**
 * calls API endpoint to get Genre data by its name
 * @function getGenreByName
 * @param name 
 * @returns genre data in JSON format
 */
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
  /**
 * calls API endpooint to get a users' data 
 * @function getUserProfile
 * @param username 
 * @returns user data in JSON format
 */
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
  /**
 * calls API endpoint to get the favorite movie list of a user
 * @function getFavoriteMovies
 * @param username
 * @returns a list of the users' favorite movies in JSON format
 */
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
  /**
 * calls API endpooint to add a movie to a users' favorite movie list
 * @function addFavoriteMovies
 * @param MovieID 
 * @returns the updated users' favorite list in JSON format
 */
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
  /**
 * call API endpoint to edit user info
 * @param userData 
 * @returns updated user information in JSON format
 */
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
  /**
 * call API endpoint to delete a user
 * @function deleteUserProfile 
 * @returns delete status
 */
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

   /**
 * calls API endpoint to delete a movie from the users' favorite list
 * @function deleteFavoriteMovies
 * @param MovieID 
 * @returns updated user info after removal of a fav movie
 */
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
/**
 *  non-typed response extraction at bottom to reduce repetition
 * @function extractResponseData
 * @param res 
 * @returns response || object
 */
private extractResponseData(res: any): any {
  const body = res;
  return body || { };
}
/**
 * Error function at bottom to reduce repetition 
 * @function handleError
 * @param error 
 * @returns error call 
 */
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