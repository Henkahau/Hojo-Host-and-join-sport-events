import { Component, OnInit, Input } from '@angular/core';

import { EventService } from '../../_services/index';
import { Router } from '@angular/router';
import { MapComponent } from '../../map/index';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit 
{
  signedIn = true;

  // These ids will be received when user clicks marker/event
  @Input() eventID: number;
  @Input() accountID: number;

  constructor(
    private router: Router,
    private eventService: EventService,
    ) { }

  ngOnInit() {
  }

  deleteEvent()
  {
    this.eventService.deleteEvent(this.eventID);
  }

  joinEvent()
  {
    // This will be also used to leave event
    this.eventService.joinEvent(this.eventID, this.accountID);
    this.signedIn = !this.signedIn;
  }

  close()
  {
    // Not necessary when using modal window
    this.router.navigate(['/']);
  }
}
