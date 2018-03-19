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
 
    constructor(
        private userService: UserService,
        private eventService: EventService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
        this.loadAllUsers();
        this.loadAllEvents();
    }
 
    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }
 
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private loadAllEvents(){
        this.eventService.getAllEvents().subscribe(events => {this.events = events; });
    }
}