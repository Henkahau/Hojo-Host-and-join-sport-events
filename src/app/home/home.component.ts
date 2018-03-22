import { Component, OnInit } from '@angular/core';
 
import { User, Event } from '../_models/index';
import { UserService, EventService } from '../_services/index';
 
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
 
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    events: Event[] = [];
    event: Event;
   
    constructor(
        private userService: UserService,
        private eventService: EventService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
       // this.loadAllUsers();
        this.loadAllEvents();
        //this.getSingleEvent();
    }
 
    deleteUser(id: number) {
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
}