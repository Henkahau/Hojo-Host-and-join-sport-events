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
  attendees: string[] = [
    'Mister Tester'
  ];

  // These ids will be received when user clicks marker/event
  eventID: string;
  eventTitle: string;
  accountID: number;

  event: Event;

  host: User;

  constructor(
        private router: Router,
        private eventService: EventService,
        private userService: UserService) { }

  ngOnInit() {
    this.loadEvent();
  }

  private loadEvent(){
    this.eventID = sessionStorage.getItem("eventId");
    this.eventService.getEventById(this.eventID)
        .subscribe(event => { this.event = event, this.eventTitle = event.title });
  }

  deleteEvent()
  {
    this.eventService.deleteEvent(this.eventID);
  }

  joinEvent()
  {
    // This will be also used to leave event
  //  this.eventService.joinEvent(this.eventID, this.accountID);
    this.signedIn = !this.signedIn;
  }

  close()
  {
    // Not necessary when using modal window
    this.router.navigate(['/']);
  }
}
