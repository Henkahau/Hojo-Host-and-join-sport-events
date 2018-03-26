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


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(){
    this.userService.getById('58ac4635-b5ed-44c2-b134-96d2161496c7').subscribe(user =>{this.user = user});
  }

  gotoEditProfile() {
    this.router.navigate(['/edit-profile']);
  }
}



