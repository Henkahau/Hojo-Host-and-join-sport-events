import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user'
import { UserService, AlertService } from '../_services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  moduleId: module.id
})
export class UserProfileComponent implements OnInit {
  
  model: any = {};
  user: User;
  router: Router;

  userProfileId: string; 

  constructor(private userService: UserService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(){
    this.userService.getById(this.user.accountId).subscribe(user =>{this.user = user});
  }

  gotoEditProfile() {
    this.router.navigate(['/edit-profile']);
  }
}
