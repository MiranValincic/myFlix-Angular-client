import { Component, Input, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: "edit-profile-form",
  templateUrl: "./edit-profile-form.component.html",
  styleUrls: ["./edit-profile-form.component.scss"],
})
export class EditProfileFormComponent implements OnInit {
  Username = localStorage.getItem("user");
  user: any = {};

  /**
   * input values bound to userData
   */

  @Input() userData = {
    Name: this.user.Name,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Born,
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * function to get user info
   * @function getUser
   * @returns user info
   */
  getUser(): void {
    const user = localStorage.getItem("user");
    this.fetchApiData.getUserProfile(user).subscribe((resp: any) => {
      this.user = resp;
      return this.user;
    });
  }
  /**
   * function to send an error if profile was not updated
   * @function onMissingData
   * @returns message that profile was not updated
   */
  onMissingData() {
    this.snackBar.open("Your profile was not updated.", "OK", {
      duration: 4000,
    });
  }

  /**
   * function to edit user profile
   * @function editUserProfile
   * @param userData
   * @returns updated user info in JSON format + storage in localStorage
   */
  editUser() {
    console.log(Object.values(this.userData));
    if (!Object.values(this.userData).some((element) => element)) {
      this.onMissingData();
      return;
    }
    if (this.userData.Name && this.userData.Name.length < 2) {
      this.onMissingData();
      return;
    }
  
    if (this.userData.Password && this.userData.Password.length < 8) {
      this.onMissingData();
      return;
    }
    this.fetchApiData.editUserProfile(this.userData).subscribe((resp) => {
      this.dialogRef.close();
      // update profile in localstorage
      localStorage.setItem('user', resp.Name)
      this.snackBar.open("Your profile was updated successfully.", "OK", {
        duration: 4000,
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
