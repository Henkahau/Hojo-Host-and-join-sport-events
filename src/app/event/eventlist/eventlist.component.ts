import { Component, OnInit } from '@angular/core';
import { Event } from '../../_models/index';

import { UserService, EventService } from '../../_services/index';
import { EventViewComponent } from '../../event/event-view';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {

  events: Event[] = [];

  constructor
  (private userService: UserService,
    private eventService: EventService) { }

  ngOnInit() {
    this.loadAllEvents();
  }

  loadAllEvents() {
    this.eventService.getAllEvents().subscribe(events => { this.events = events; });
  }
}
