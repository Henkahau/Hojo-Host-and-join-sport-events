import { Component, OnInit } from '@angular/core';
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
  router: Router;

  userProfileId: string; 

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService) {
                this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(){
    this.currentUser
  }

  gotoEditProfile() {
    this.router.navigate(['/edit-profile']);
  }
}
