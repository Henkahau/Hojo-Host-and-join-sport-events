import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Event } from '../_models/index';
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

    constructor(
        private router: Router,
        private modalService: BsModalService,
        private eventService: EventService) {}

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
        }
    }
}