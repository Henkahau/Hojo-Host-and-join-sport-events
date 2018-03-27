import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
 
import { AlertService, AuthenticationService, ModalService } from '../_services/index';

 
@Component({
    selector: 'app-login',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styles: ['head { background-color: green; }'] // Ei vaihda vielä edes taustaväriä perkele.
    //styleUrls: ['./login.component.css']
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    closeBtn: string;
   // loggedIn = false;
   // message: number;

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
                    this.router.navigate([this.returnUrl]);
                  //  this.loggedIn;
                   // this.onLoggedIn();

                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    close(){
        this.bsModalRef.hide();
    }

 
 //  onLoggedIn(){
       
  //  this.sendMessage(val)
//    }

//    sendMessage(val:any){

//     this.message =   val;
//     this.messageEvent.emit(this.message);

//    }
}