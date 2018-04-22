import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
 
import { AlertService, AuthenticationService } from '../_services/index';

 
@Component({
    selector: 'app-login',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    closeBtn: string;

    @Output () messageEvent = new EventEmitter<number>();
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private bsModalRef: BsModalRef) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.notapwhash)
            .subscribe(
                data => {
                    this.authenticationService.setLoginStatus(true);
                    this.close();
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    close(){
        this.bsModalRef.hide();
    }
}