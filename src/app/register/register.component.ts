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
 
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }
 
    register() {
        this.model.pwsalt = 'tamaonhienotoiminto';

        this.loading = true;
        this.userService.create(this.model)
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
                    console.log(error);
                    console.log(error.message);
                    this.loading = false;
                });
    }
}