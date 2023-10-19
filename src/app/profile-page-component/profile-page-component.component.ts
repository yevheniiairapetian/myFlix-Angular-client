import { Component, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


type User = { _id?: string, Username?: string, Password?: string, Birthday?: Date, Email?: string, FavoriteMovies?: [] }

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page-component.component.html',
  styleUrls: ['./profile-page-component.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: User = {};

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
   const user = this.getUser();
    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

/**
   * Set user's username, birthday, email, password.
   */
    this.user = user;
    this.userData = {
      Username: user.Username || "",
      Birthday: "",
      Email: user.Email || "",
      Password: "",

    }
  }


/**
   * Retrieves user data from local storage.
   * @returns The user object retrieved from local storage.
   */
  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  /**
   * Updates the user's profile information.
   * Displays a success notification upon successful update.
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      console.log(response)
      localStorage.setItem('user', JSON.stringify(response))
      this.user = response;
      this.snackBar.open('user updated!', 'OK', {
        duration: 2000
      })
    })
  }

  /**
   * Deletes the user's account with confirmation.
   * Navigates back to the welcome page upon successful deletion.
   */
  deleteUser(): void {
    if (confirm('are you sure?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }

}
