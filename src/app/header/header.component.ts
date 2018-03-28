import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Event, User} from '../_models/index';
import { UserService, EventService } from '../_services/index';

import { CreateEventComponent } from '../event/index';
import { LoginComponent } from '../login';
import { RegisterComponent } from '../register';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    loggaIn = true;
    modalRef: BsModalRef;

    currentUser: User;

    constructor(
        private router: Router,
        private modalService: BsModalService,
        private eventService: EventService) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }

    onSelect(feature: string)
    {
        switch (feature)
        {
            case 'create': 
            if(this.currentUser != null){
                this.modalRef = this.modalService.
                            show(CreateEventComponent, {ignoreBackdropClick: true, class: 'modal-lg'});
            }else{
                this.modalRef = this.modalService.
                show(LoginComponent);
            }
                
                break;
            
            case 'login': {
                this.modalRef = this.modalService.
                show(LoginComponent);
                break;
            }
            case 'register': {
                this.modalRef = this.modalService.
                show(RegisterComponent, {ignoreBackdropClick: true, class: 'modal-lg'});
                break;
            }
        }
    }
}