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
  user: User;
  static editProfileId: string;

  onFileSelected(event){
    console.log(event);
  }



  constructor(private userService: UserService,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(){
    this.userService.getById('58ac4635-b5ed-44c2-b134-96d2161496c7').subscribe(user =>{this.user = user});
  }

  // private editProfile(){
  //   this.userService.update(this.user).subscribe
  //   (
  //     data=>{
  //         this.alertService.success('Profile edited successfully');
  //         this.router.navigate(['/user-profile']);
  //       }
  //     ,error =>{
  //         this.alertService.error(error);
  //         this.loading = false;
  //       }
  //   );
  // }
}