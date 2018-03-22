import { Component, OnInit, Input } from '@angular/core';

import { EventService, UserService } from '../../_services/index';
import { Router } from '@angular/router';
import { Event, User } from '../../_models';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
})
export class EventViewComponent implements OnInit 
{
  signedIn = true;
  attendees: string[] = [
    'Mister Tester'
  ];

  // These ids will be received when user clicks marker/event
  @Input() eventID: number;
  @Input() accountID: number;

  @Input() event: Event;

  user: User;

  constructor(
    private router: Router,
    private eventService: EventService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.userService.getById('58ac4635-b5ed-44c2-b134-96d2161496c7').subscribe(user => {
      this.user = user;
    });
  }

  deleteEvent()
  {
   // this.eventService.deleteEvent(this.eventID);
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
    // this.router.navigate(['/']);
    console.log(this.user);
  }
}
