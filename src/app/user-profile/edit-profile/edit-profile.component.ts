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
  currentUser: User;
  profileEdited: boolean = false;
  profileToEdit: User;
  static editProfileId: string;
  imagePath: string = '../../assets/Images/default_profile_image.png'; 

  onFileSelected(event){
    
  }

  constructor(private userService: UserService,
              private alertService: AlertService,
              private router: Router) { 
                var currUser = JSON.parse(localStorage.getItem('currentUser'));
                this.currentUser = currUser.Account;
              }
                
  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(){
    this.userService.getById(this.currentUser.accountId).subscribe(user => {
      this.profileToEdit = user[0];      
    });
  }

  setTrue(val: any){
    this.profileEdited = true;
    return this.profileEdited
  }

  isSomethingChanged(): boolean{
    return this.profileEdited
  }

  private getChanges(curProf: User, ediProf: User){
    var model: any = {};
    
    if(curProf.firstName != ediProf.firstName){
      model.firstName != ediProf.firstName;
    }
    if(curProf.lastName != ediProf.lastName){
      model.lastName = ediProf.lastName;
    }
    if(curProf.email != ediProf.email){
      model.email = ediProf.email;
    }
    if(curProf.mobileNumber != ediProf.mobileNumber){
      model.mobileNumber != ediProf.mobileNumber;
    }
    if(curProf.biography != ediProf.biography){
      model.biography = ediProf.biography;
    }

    return model;

  }

  private editProfile(){
       
    if(Object.keys(this.getChanges(this.currentUser, this.profileToEdit)).length == 0 ){
      console.log("tyhyjä");
    }else{
      console.log("muutettu");
      this.userService.update(this.currentUser.accountId, this.getChanges(this.currentUser, this.profileToEdit)).subscribe
      (
        data=>{
            var currUser = JSON.parse(localStorage.getItem('currentUser'));
            currUser.Account = this.profileToEdit;
            localStorage.setItem('currentUser', JSON.stringify(currUser));
            console.log(JSON.parse(localStorage.getItem('currentUser')));
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
}