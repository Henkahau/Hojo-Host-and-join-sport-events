import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { AlertService, UserService } from '../_services/index';
import { User } from '../_models';
 
@Component({
    selector: 'app-register',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})
 
export class RegisterComponent {
    model: any = {};
    loading = false;

    user: User = {
        id: 'VeryImportantID',
        profilePicture: 'string',
        email: 'string',
        mobileNumber: 112,
        firstName: 'string',
        lastName: 'string',
        biography: 'string',
        password: 'string'
    };
 
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }
 
    register() {
        // this.user.profilePicture    = 'PrettyPicture';
        // this.user.email             = this.model.email;
        // this.user.mobileNumber      = this.model.mobileNumber;
        // this.user.biography         = 'Push it baby';
        // this.user.firstName         = this.model.firstName;
        // this.user.lastName          = this.model.lastName;
        // this.user.password          = this.model.password;
        // this.user.id                = 'ImportantID';


        this.loading = true;
        this.userService.create(this.user)
            .subscribe(
                data => {
                    console.log('THIS ONE!: ' + data);
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', false);
                    this.router.navigate(['/login']);

                },
                error => {
                    this.alertService.error(error);
                    console.log('ERROR MESSAGE FOR KOEN: ' + JSON.stringify(error.error));
                    this.loading = false;
                });
    }
}