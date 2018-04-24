import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
 
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
        private alertService: AlertService,
        private bsModalRef: BsModalRef) { }
 
    register() {
        
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', false);
                    setTimeout(()=> { this.close()}, 1800);
                },
                error => {
                    this.alertService.error('Registration failed');
                    this.loading = false;
                });
    }

    close(){
        this.bsModalRef.hide();
    }
}