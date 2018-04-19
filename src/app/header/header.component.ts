import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Event } from '../_models/index';
import { UserService, EventService, AuthenticationService } from '../_services/index';

import { CreateEventComponent } from '../event/index';
import { LoginComponent } from '../login';
import { RegisterComponent } from '../register';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
    
})
export class HeaderComponent{
    
    isUserloggedIn: boolean;
    @Output ()public imagePath: string = "http://i0.wp.com/cdn.techgyd.com/save-whatsapp-profile-picture-image3.jpg?resize=337%2C337";
    @Output ()public imagePath2: string = '../../assets/Images/logo.png'; 
    modalRef: BsModalRef;
 
    constructor(
        private router: Router,
        private modalService: BsModalService,
        private eventService: EventService,
        private authenticationService: AuthenticationService) {}

    getUserLoginStatus(): boolean {
        return this.authenticationService.getLoginStatus();
    }

    onSelect(feature: string)
    {
        switch (feature)
        {
            case 'create': {
                this.modalRef = this.modalService.
                            show(CreateEventComponent, {ignoreBackdropClick: true, class: 'modal-lg'});
                break;
            }
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

            case 'logout':{
                this.authenticationService.logout();
                break;
            }

        }
    }
}