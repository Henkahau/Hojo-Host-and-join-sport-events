import { Component, OnInit } from '@angular/core';

import { EventService } from '../../_services/index';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit 
{
  ifSignedIn = true;  

  private eventService: EventService;

  constructor() { }

  ngOnInit() {
  }

  delete()
  {
    // Replace number 1 with actual event id
    this.eventService.deleteEvent(1);
  }

}
