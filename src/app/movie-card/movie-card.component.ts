// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieDetailDialogComponent } from '../movie-detail-dialog/movie-detail-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router) { }

    ngOnInit(): void {
      // Check if a user is logged in
      const user = localStorage.getItem('user');
      // If no user is logged in, navigate to the welcome page
      if (!user) {
        this.router.navigate(['welcome']);
        return;
      }
      // Fetch and display movies
      this.getMovies();
    }

    /**
   * Fetches a list of movies from the API and assigns it to the 'movies' variable.
   */

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens a dialog displaying genre details.
   * @param genre - The genre object containing the name and description.
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: genre.Name,
        content: genre.Description,
      }
    })
  }

  /**
   * Opens a dialog dsplaying movie actors
   * @param actors
   */

  openActorsDialog(actors: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: "Actors",
        content: actors,
      }
    })
  }

  /**
   * opens a dialog displaying director details like name and Biography
   * @param director
   */

  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: director.Name,
        content: director.Bio,
      }
    })
  }

  /**
   * opens a dialog displaying IMDb Rating details
   * @param IMDbRating
   */

  openRatingDialog(IMDbRating: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: "IMDbRating",
        content: IMDbRating,
      }
    })
  }

  /**
   * opens a dialog displaying Release Year details
   * @param ReleaseDate
   */

  openYearDialog(ReleaseDate: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: "Release Year",
        content: ReleaseDate,
      }
    })
  }

  /**
   * Add movie to users Favorites
   * displays a notification if the movie is succesfully added
   * @param id
   */

  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('added to favorites', 'OK', {
        duration: 2000
      })
    });
  }

  /**
   * Checks if a movie is in the user's favorites.
   * @param id
   * @returns True or False depending if the movie is in
   */

  isFavorite(id: string): any {
    return this.fetchApiData.isFavoriteMovie(id)
  }

  /**
   * Removes a movie from the user's favorites.
   * displays a notification with succesfully removed
   * @param id
   */

  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('removed from favorites', 'OK', {
        duration: 2000
      })
    });
  }


}
