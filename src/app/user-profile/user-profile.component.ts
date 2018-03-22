import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // user: User={
  //   id: '',
  //   profilePicture: '',
  //   email: 'email',
  //   mobileNumber: 100123123,
  //   biography: '',
  //   notapwhash: '',
  //   firstName: 'Anton',
  //   lastName: 'Junttari'
  // };

  constructor() { }

  ngOnInit() {
  }

}
