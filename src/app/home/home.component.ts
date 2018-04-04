import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
 
import { User, Event } from '../_models/index';
import { UserService, EventService } from '../_services/index';
import { EditEventComponent, CreateEventComponent } from '../event';
import { EventViewComponent } from '../event/event-view';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { LoginComponent } from '../login/index';
import { RegisterComponent } from '../register/index';
 
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
 
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    events: Event[] = [];
    event: Event;
    user: User;

    modalRef: BsModalRef;
    
   
    constructor(
        private userService: UserService,
        private eventService: EventService,
        private router: Router,
        private modalService: BsModalService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
       // this.loadAllUsers();
        this.loadAllEvents();
        //this.getSingleEvent();
        this.getSingleUser();
    }
 
    deleteUser(id: string) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    deleteEvent(id: string){
        this.eventService.deleteEvent(id).subscribe(() => { this.loadAllEvents()});
    }
 
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private loadAllEvents(){
        this.eventService.getAllEvents().subscribe(events => {this.events = events; });
    }

    private getSingleEvent(){
        this.eventService.getEventById('5c86889b-1830-4dbc-8dd0-701733ac0b3e').subscribe(event => { this.event = event });
        
    }

    private openEdit(id: string){
        sessionStorage.setItem("eventId", id);
        this.router.navigate(['/edit-event']);
    }

    private openEventView(id: string){
        sessionStorage.setItem("eventId", id);
        this.openModal('eventView'); 
        //this.router.navigate(['/event-view']);
    }

    private openProfileView(id: string){
        sessionStorage.setItem("userId", id);
        this.router.navigate(['/user-profile']);
    }

    private getSingleUser(){
        this.userService.getById('58ac4635-b5ed-44c2-b134-96d2161496c7').subscribe(user => { this.user = user });
    }

    private openModal(template: string){
        switch(template){
            case "login":
            this.modalRef = this.modalService.show(LoginComponent);
            break;

            case "register":
            this.modalRef = this.modalService.show(RegisterComponent, {class: 'modal-lg'});
            break;

            case "createEvent":
            this.modalRef = this.modalService.show(CreateEventComponent, {ignoreBackdropClick: true, class: 'modal-lg'});
            break;

            case "eventView":
            this.modalRef = this. modalService.show(EventViewComponent, {class: 'modal-lg'});
        }
       
    }
}