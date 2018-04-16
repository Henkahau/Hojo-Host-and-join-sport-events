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
  imagePath: string = '../../assets/Images/default_profile_image.png'; 

  onFileSelected(event){
    
  }



  constructor(private userService: UserService,
              private alertService: AlertService,
              private router: Router) { this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(){
  //  this.currentUser
  }

  private editProfile(){
    /* console.log(this.currentUser); */
    this.userService.update(this.currentUser.accountId, this.model).subscribe
    (
      data=>{
          //localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
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