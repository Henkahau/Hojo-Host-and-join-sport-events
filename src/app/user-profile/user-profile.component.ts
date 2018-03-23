import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user'


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  static userProfileId: string; 

  constructor() { }

  ngOnInit() {
  }

  private loadProfile(){
    
  }

}
