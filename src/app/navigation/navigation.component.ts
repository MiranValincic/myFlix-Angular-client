import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    public router: Router,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  toUser(): void {
    this.router.navigate(['/profile']);
  }

  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * function to log out a user and clear localStorage
   * additional reroute to welcome page
   */
  userLogout(): void {
    localStorage.clear();
    this.snackBar.open('You have successfully logged out.', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['/welcome']).then(() => {
      window.location.reload();
    });
  }

}