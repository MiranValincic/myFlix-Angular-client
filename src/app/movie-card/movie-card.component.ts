import { Component, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { DirectorCardComponent } from "../director-card/director-card.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GenreCardComponent } from "../genre-card/genre-card.component";
import { SynopsisCardComponent } from "../synopsis-card/synopsis-card.component";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent {
  user: any = {};
  Username = localStorage.getItem("user");
  movies: any[] = [];
  currentUser: any = null;
  FavMovie: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getCurrentUser();
    this.showFavMovie();
  }

   /**
   * function to show all movies
   * @function getAllMovies
   * @returns movies in JSON format
   */
  //Get all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
    /**
   * function to pull all favorited movies of a user.
   */
  showFavMovie(): void {
    const user = localStorage.getItem("user");
    this.fetchApiData.getUserProfile(user).subscribe((resp: any) => {
      this.FavMovie = resp.FavoriteMovies;
      return this.FavMovie;
    });
  }
  /**
   * open Director dialog
   * @param name 
   * @param bio 
   */
  openDirectorDialog(name: string, bio: string, born: Date): void {
    this.dialog.open(DirectorCardComponent, {
      panelClass: "custom-dialog-container",
      data: { name, bio, born },
      width: "500px",
    });
  }
  
    /**
   * open Genre dialog
   * @param name 
   * @param description 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      panelClass: "custom-dialog-container",
      data: { name, description },
      width: "500px",
    });
  }

   /**
   * open Synopsis dialog
   * @param title 
   * @param description 
   */
  openSynopsis(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      panelClass: "custom-dialog-container",
      data: { title, description },
    });
  }
  getCurrentUser(): void {
    const username = localStorage.getItem("user");
    this.fetchApiData.getUserProfile(username).subscribe((resp: any) => {

    });
  }

   /**
   * function to let user add a movie to their favorite movies
   * @function addToUserFavs
   * @param id 
   * @param Title 
   * @returns movie object array in JSON format
   */
  addToUserFavs(id: string, Title: string): void {
    console.log(id);
    const token = localStorage.getItem("token");
    console.log(token);
    this.fetchApiData.addFavoriteMovies(id).subscribe((response: any) => {
      this.snackBar.open(`${Title} has been added to your favorites.`, 'OK', {
        duration: 3000,
      });
      this.showFavMovie();
    });
  }

   /**
   * function to let user remove a movie from their favorite movies
   * @function deleteFavs
   * @param MovieID 
   * @param Title 
   * @returns updated users' fav movies in JSON format
   */
  deleteFavs(MovieID: string, Title: string): void {
    this.fetchApiData.deleteFavoriteMovies(MovieID).subscribe((resp: any) => {
      this.snackBar.open(`${Title} is no longer favorited.`, 'OK', {
        duration: 3000,
      });
      this.showFavMovie();
    });
  }

  /**
   * function to check if a movie is favorited
   * @param MovieID 
   * @returns boolean true or false
   */
  isFav(MovieID: string): boolean {
    return this.FavMovie.some((id) => id === MovieID);
  }

  /**
   * function to toggle favorited status
   * @function addToUserFavs or 
   * @function deleteFavs
   * depending on fav status
   * @param movie 
   */
  setFavStatus(movie: any): void {
    this.isFav(movie._id)
      ? this.deleteFavs(movie._id, movie.Title)
      : this.addToUserFavs(movie._id, movie.Title);
  }
}