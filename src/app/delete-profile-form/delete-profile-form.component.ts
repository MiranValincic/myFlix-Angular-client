import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-profile-form',
  templateUrl: './delete-profile-form.component.html',
  styleUrls: ['./delete-profile-form.component.scss']
})
export class DeleteProfileFormComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteProfileFormComponent>,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * function to delete a user
   * @function deleteUserProfile
   * @returns delete status and reroutes to welcome page 
   */
  deleteUserProfile(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.deleteUserProfile().subscribe((resp: any) => {
      this.dialogRef.close();
      this.snackBar.open(`Your profile has been deleted.`, 'OK', {
        duration: 2000
      });
    });
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}