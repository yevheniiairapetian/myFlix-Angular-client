import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
   * Declaring the API URL here
   */

const apiUrl = 'https://r3play-934f9ea5664d.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

/** User Registration Service
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   */

export class UserRegistrationService {
  constructor(private http: HttpClient) { }

   /**
   * API call, registers a user.
   * @param userDetails
   * @returns json object with user details
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * API call, logs the user in.
   * @param userDetails
   * @returns json object with user details
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login?' + new URLSearchParams(userDetails), {}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * API call, gets all movies.
   * @returns all movies as objects
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API call, gets one movie.
   * @param title
   * @returns one movie as an object
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API call, gets a director.
   * @param directorName
   * @returns the director name and description as an object
   */
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API call, gets the genre.
   * @param genreName
   * @returns the genre name and description as an object
   */
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API call, gets one user.
   * @param username
   * @returns one user as an object
   */
  getOneUser(username: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
    /*This endpoint doesn't exist yet but could look like this
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
    headers: new HttpHeaders(
    {
    Authorization: 'Bearer ' + token,
         })
     }).pipe(
       map(this.extractResponseData),
       catchError(this.handleError)
     );
     */
  }

  /**
   * API call, gets one user.
   * @param username
   * @returns one user as an object
   */
  getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  /**
   * Api call, adds a movie to user's favorite list
   * @param movieId
   * @returns user object with a favorite movie data
   */

  addFavoriteMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    user.FavoriteMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
      responseType: "text"
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Api call, deletes a movie from user's favorite list
   * @param movieId
   * @returns user object with a deleted movie data
   */
  deleteFavoriteMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    const index = user.FavoriteMovies.indexOf(movieId);
    console.log(index);
    if (index > -1) { // only splice array when item is found
      user.FavoriteMovies.splice(index, 1); // 2nd parameter means remove one item only
    }
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
      responseType: "text"
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Checks if the movie is favorite
   * @param movieId
   * @returns user object with a favorite movie data
   */
  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieId) >= 0;
  }

/**
   * Api call, edits a user
   * @param updatedUser
   * @returns user object with the updated data
   */

  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + user.Username, updatedUser, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
   * Api call, deletes a user
   * @returns user object with the updated data
   */

  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }


  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles errors from the HttpErrorResponse
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }
}
