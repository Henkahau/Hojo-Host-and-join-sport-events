import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user'
import { UserService } from '../_services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: User;

  //  $scope.editingUser = function(currentUser){
  //    $scope.editObject = angular.copy($scope.users[currentUser]);
  // }
  
  constructor(private userService: UserService) { this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

  ngOnInit() {
  }

}
