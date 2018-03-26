import { Component, OnInit, Input } from '@angular/core';

import { EventService, UserService } from '../../_services/index';
import { Router } from '@angular/router';
import { Event, SportType, PlayType, SkillLevel, User } from '../../_models';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit 
{
  signedIn = true;
  attendees: string[] = [];

  // These ids will be received when user clicks marker/event
  eventID: string;
  eventTitle: string;
  accountID: number;

  event: Event;
  host: User;
  REPLACABLE_USER: User;

  constructor(
        private router: Router,
        private eventService: EventService,
        private userService: UserService) { }

  ngOnInit() {
    this.loadEvent();
  }

  private loadEvent(){
    this.eventService.getEventById('f4edbecf-ab9d-4a47-bd83-1359d9893c0e').subscribe(event => {
      this.event = event;
    });
    // THIS ONE WILL BE HOST
    this.userService.getById('58ac4635-b5ed-44c2-b134-96d2161496c7').subscribe(user => {
    this.REPLACABLE_USER = user;
    // Add host as player to list
    this.event.players.push(this.REPLACABLE_USER);
    });
  }

  deleteEvent() {
   // this.eventService.deleteEvent(this.eventID);
  }

  joinEvent() {
    // This will be also used to leave event
    // this.eventService.joinEvent(this.eventID, this.accountID);
    this.signedIn = !this.signedIn;
  }

  close() {
    // Not necessary when using modal window
    this.router.navigate(['/home']);
  }
}
