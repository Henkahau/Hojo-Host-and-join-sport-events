import { Component, OnInit, Output } from '@angular/core';
import { User } from '../_models/user'
import { UserService, AlertService, AuthenticationService } from '../_services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  moduleId: module.id
})
export class UserProfileComponent implements OnInit {
  
  model: any = {};
  currentUser: User;

  userProfileId: string;

  imagePath: string = '../../assets/Images/default_profile_image.png'; 

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router) {
                 var currUser = JSON.parse(localStorage.getItem('currentUser'));
                 this.currentUser = currUser.Account;
                }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(){
    /* this.userService.getById(this.currentUser.Account.accountId).subscribe(user => {
      this.currentUser = user[0];     
    }); */
  }

  navigate(destination: string) {
    switch(destination) {
      case 'edit':
      this.router.navigate(['/edit-profile']);
      break;

      case 'home':
      this.router.navigate(['']);
      break;
    }
  }
}
