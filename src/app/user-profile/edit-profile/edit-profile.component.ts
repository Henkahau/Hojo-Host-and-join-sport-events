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
  model: any = {};
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
    
    
    if(curProf.firstName != ediProf.firstName){
      this.model.firstName = ediProf.firstName;
    }
    if(curProf.lastName != ediProf.lastName){
      this.model.lastName = ediProf.lastName;
    }
    if(curProf.email != ediProf.email){
      this.model.email = ediProf.email;
    }
    if(curProf.mobileNumber != ediProf.mobileNumber){
      this.model.mobileNumber = ediProf.mobileNumber;
    }
    if(curProf.biography != ediProf.biography){
      this.model.biography = ediProf.biography;
    }

    return this.model;

  }

  private editProfile(){
    console.log(this.getChanges(this.currentUser, this.profileToEdit));
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