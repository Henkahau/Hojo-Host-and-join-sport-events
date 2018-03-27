import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

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
        private userService: UserService,
        private bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.loadEvent();
    console.log('2');
      console.log(this.REPLACABLE_USER);
  }

  private loadEvent() {
    this.eventID = sessionStorage.getItem("eventId");
    this.eventService.getEventById(this.eventID)
      .subscribe(event => { this.event = event, this.eventTitle = event.title });
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.eventID);
  }

  joinEvent() {
    // This will be also used to leave event
    // this.eventService.joinEvent(this.eventID, this.accountID);
    this.signedIn = !this.signedIn;
    console.log(this.REPLACABLE_USER.firstName);
  }

  close() {
    this.bsModalRef.hide();
  }
}
