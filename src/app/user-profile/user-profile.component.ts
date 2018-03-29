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

 // user: User;
  userProfileId: string; 

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(){
    this.userService.getById('95aa5bcb-7ab1-4313-9d90-98eb3532bf21').subscribe(user =>{this.user = user});
  }

  gotoEditProfile() {
    this.router.navigate(['/edit-profile']);
  }
}
