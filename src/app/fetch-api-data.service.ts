import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError,catchError  } from 'rxjs';
import { map } from 'rxjs/operators';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://miran-flix.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
 public userRegistration(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'users', userDetails).pipe(
  catchError(this.handleError)
);
}

  // Login of users
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get one movie
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title',{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get director details
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/directors/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get genre details
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/genre/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

    // Get user info
    getUser(): Observable<any> {
      const token = localStorage.getItem('token');
        return this.http
        .get(apiUrl + "/users/:Name", {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    // Get favorite movie from user
    getFavMovie(movieId: string): Observable<any> {
      const token = localStorage.getItem('token');
      //no GET request for this endpoint previously made in API; was used for PUSH request
      return this.http.get(apiUrl + `users/:Name/movies/${movieId}`, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // Add a movie to favorite
    addFavouriteMovie(movieId: string, Title: string): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('Name');
      console.log(apiUrl + `users/${username}/movies/${movieId}`);
      return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, {}, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // Edit user
    editUser(userData: object): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('Name');
      return this.http.put(apiUrl + `users/${username}`, userData, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
      }).pipe(
          map(this.extractResponseData), catchError(this.handleError)
        );
    }

    // Delete user
    deleteUser(): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('Name');
      return this.http
        .delete(apiUrl + `users/${username}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError)
      );
    }

    // Delete a movie from the favorite
    deleteFavouriteMovie(movieId: string, Title: string): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('Name');
      return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
// Non-typed response extraction
  private extractResponseData(res: Response): any {
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
    'Something bad happened; please try again later.');
  }
}