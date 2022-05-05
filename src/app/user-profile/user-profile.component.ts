import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  userName: any = localStorage.getItem('user');
  favs: any = null;
  favMovie: any[] = [];
  displayElement: boolean = false

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {

    
    // this.getfavMovies()
    this.getUser();
    this.getFavs()  
  }
  
  openSynopsis(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      panelClass: "custom-dialog-container",
      data: { title, description },
    });
  }
  // open Director dialog
  openDirectorDialog(name: string, bio: string, born: Date): void {
    this.dialog.open(DirectorCardComponent, {
      panelClass: "custom-dialog-container",
      data: { name, bio, born },
      width: "500px",
    });
  }
  // Open Genre View
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      panelClass: "custom-dialog-container",
      data: { name, description },
      width: "500px",
    });
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUserProfile(user).subscribe((resp: any) => {
        this.user = resp;
      });
    }
  }
  
  openEditUserProfile(): void {
    this.dialog.open(EditProfileFormComponent, {
      width: '500px'
    });
  }
  
  getFavs(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favMovie.push(movie);
        }
      });
    });
  }
  
         

  //Delete User account
 
  deleteUserProfile(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account was deleted', 'OK', {duration: 6000});
      });
      this.router.navigate(['welcome'])
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        localStorage.clear();
      });
    }
  
  }
  removeFavMovie(MovieID: string, Title: string): void {
    this.fetchApiData.deleteFavoriteMovies(MovieID).subscribe((resp) => {
      this.snackBar.open(
        `${Title} is no longer favorited`,
        'OK',
        {
          duration: 1000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

}