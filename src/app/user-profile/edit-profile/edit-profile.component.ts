import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
import { UserService, AlertService } from '../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  moduleId: module.id
})
export class EditProfileComponent implements OnInit {

  loading = false;
  model: any = {};
  currentUser: User;
  static editProfileId: string;

  onFileSelected(event){
    console.log(event);
  }



  constructor(private userService: UserService,
              private alertService: AlertService,
              private router: Router) { this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(){
   this.currentUser // this.userService.getById(this.currentUser.id).subscribe(user =>{this.currentUser = user});
  }

  private editProfile(){
    this.userService.update(this.currentUser).subscribe
    (
      data=>{
          this.alertService.success('Profile edited successfully');
          this.router.navigate(['/user-profile']);
        }
      ,error =>{
          this.alertService.error(error);
          this.loading = false;
        }
    );
  }
}