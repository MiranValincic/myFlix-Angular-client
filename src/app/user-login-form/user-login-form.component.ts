import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
   /**
   * store input value in userData
   */
  @Input() userCredentials = { Name: '', Password: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

ngOnInit(): void {
}

  /**
   * function responsible for sending form inputs to backend
   * @function loginUser
   * @return user data in JSON format
   */
loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe((response) => {
      localStorage.setItem('user', response.user.Name);
      localStorage.setItem('token', response.token);
     this.dialogRef.close();
     this.snackBar.open('You have logged in!', 'OK', {
        duration: 2000
     });
     this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    });
  }

  }